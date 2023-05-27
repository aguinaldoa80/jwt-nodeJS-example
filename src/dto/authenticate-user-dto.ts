import { User } from "../entities/User";

export class AuthenticateUserDTO {
  id: string
  name: string
  email: string
  token: string

  constructor(data: User, token: string){
    this.name = data.name;
    this.email = data.email;
    this.id = data.id;
    this.token = token;
  }
}