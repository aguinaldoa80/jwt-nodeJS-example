import {CreateUserDTO} from '../dto/user-create-dto'
import { User } from '../entities/User';
import { ApiError, BadRequestError, DuplicityError, InvalidCredentialsError } from '../helpers/api-error';
import { userRepository } from '../repositories/user-repository';
import bcrypt from 'bcrypt'
import { AuthenticateUserDTO } from '../dto/authenticate-user-dto';
import jwt from 'jsonwebtoken'

export class AuthenticateUserService {
  async execute(createUserDTO: CreateUserDTO): Promise<AuthenticateUserDTO | ApiError> {
    
    if(!createUserDTO.email){
      throw new BadRequestError('Mandatory field [email] not found!')
    }
    if(!createUserDTO.password){
      throw new BadRequestError('Mandatory field [password] not found!')
    }
    createUserDTO.email = createUserDTO.email.toLowerCase()
    const user = await userRepository.findOne({where: {email: createUserDTO.email}})

    if(!user){
      throw new InvalidCredentialsError()
    }

    const verifyPass = await bcrypt.compare(createUserDTO.password, user.password)
    if (!verifyPass) {
			throw new InvalidCredentialsError()
		}
    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
			expiresIn: process.env.JWT_EXPIRES_IN,
		})
    
    const { password: _, ...userLogin } = user
    const authUser = new AuthenticateUserDTO(user, token);
    return authUser;
  }
  
}