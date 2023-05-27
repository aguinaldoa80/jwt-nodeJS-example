import { Request, Response } from "express";
import {CreateUserDTO} from '../dto/user-create-dto'
import { ApiError } from "../helpers/api-error";
import { CreateUserService } from '../services/CreateUserService'

export class CreateUserController {
  async handle(req: Request, res: Response){
    const createUserDTO = new CreateUserDTO(req.body);
    const service = new CreateUserService();

    const response = await service.execute(createUserDTO)

    if(response instanceof ApiError){
      return res.status(response.statusCode).json({message: response.message});
    }else{
      res.status(201).json({id: response.id, message: 'User created successfully'});
    }
  }
}