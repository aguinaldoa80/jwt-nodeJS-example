import {CreateUserDTO} from '../dto/user-create-dto'
import { User } from '../entities/User';
import { ApiError, BadRequestError, DuplicityError, UnauthorizedError } from '../helpers/api-error';
import { userRepository } from '../repositories/user-repository';
import bcrypt from 'bcrypt'
import { AuthenticateUserDTO } from '../dto/authenticate-user-dto';

export class GetUserProfileService {
  
  async execute(id: string): Promise<User | ApiError> {
    
    const user = await userRepository.findOne({where: {id}})

    if(!user){
      throw new UnauthorizedError()
    }
    user.password = ""
    
    return user;
  }
}