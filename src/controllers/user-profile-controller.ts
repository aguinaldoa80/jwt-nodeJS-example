import { Request, Response } from "express";
import { ApiError } from "../helpers/api-error";
import { GetUserProfileService } from "../services/GetUserProfileService";

export class GetUserProfileController {
  async handle(req: Request, res: Response){

    const service = new GetUserProfileService()
    const id = req.user.id as string;
    
    const response = await service.execute(id)

    if(response instanceof ApiError){
      return res.status(response.statusCode).json({message: response.message});
    }else{
      res.status(201).json(response);
    }
  }
}