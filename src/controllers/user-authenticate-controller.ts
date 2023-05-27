import { Request, Response } from "express";
import {CreateUserDTO} from '../dto/user-create-dto'
import { ApiError } from "../helpers/api-error";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { CreateUserService } from '../services/CreateUserService'

export class AuthenticateUserController {
  async handle(req: Request, res: Response){
    const service = new AuthenticateUserService();
    const response = await service.execute(req.body)

    if(response instanceof ApiError){
      return res.status(response.statusCode).json({message: response.message});
    }else{
      res.status(200).json({id: response.id, name: response.name, token: response.token});
    }
  }
}