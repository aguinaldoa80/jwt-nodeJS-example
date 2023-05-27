export class CreateUserDTO {
  name: string
  email: string
  password: string

  constructor(data: {name: string, email: string, password: string}){
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}