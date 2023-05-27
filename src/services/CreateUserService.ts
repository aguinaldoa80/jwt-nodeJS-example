import {CreateUserDTO} from '../dto/user-create-dto'
import { User } from '../entities/User';
import { ApiError, BadRequestError, DuplicityError } from '../helpers/api-error';
import { userRepository } from '../repositories/user-repository';
import bcrypt from 'bcrypt'

export class CreateUserService {
  
  async execute(createUserDTO: CreateUserDTO): Promise<User | ApiError> {
    const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!createUserDTO.name){
      throw new BadRequestError('Mandatory field [name] not found!')
    }
    if(!createUserDTO.email){
      throw new BadRequestError('Mandatory field [email] not found!')
    }
    if(!createUserDTO.password){
      throw new BadRequestError('Mandatory field [password] not found!')
    }
    if(!emailRegexp.test(createUserDTO.email)){
      throw new BadRequestError(`[${createUserDTO.email}] is not a validy email`)
    }
    createUserDTO.email = createUserDTO.email.toLowerCase()

    const exist = await userRepository.findOne({where: {email: createUserDTO.email}});
    if(exist){
      throw new DuplicityError(`Email [${createUserDTO.email}] already in use.`)
    }
    
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, 10)
    
    const user = userRepository.create(createUserDTO)

    await userRepository.save(user);
    return user;
  }
}