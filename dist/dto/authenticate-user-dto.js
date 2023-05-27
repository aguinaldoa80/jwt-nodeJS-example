"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserDTO = void 0;
class AuthenticateUserDTO {
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.id = data.id;
        this.token = data.token;
    }
}
exports.AuthenticateUserDTO = AuthenticateUserDTO;
