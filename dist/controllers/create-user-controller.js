"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const user_create_dto_1 = require("../dto/user-create-dto");
const api_error_1 = require("../helpers/api-error");
const CreateUserService_1 = require("../services/CreateUserService");
class CreateUserController {
    async handle(req, res) {
        const createUserDTO = new user_create_dto_1.CreateUserDTO(req.body);
        const service = new CreateUserService_1.CreateUserService();
        const response = await service.execute(createUserDTO);
        if (response instanceof api_error_1.ApiError) {
            return res.status(response.statusCode).json({ message: response.message });
        }
        else {
            res.status(201).json({ id: response.id, message: 'User created successfully' });
        }
    }
}
exports.CreateUserController = CreateUserController;
