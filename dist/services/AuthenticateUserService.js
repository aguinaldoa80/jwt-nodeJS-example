"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserService = void 0;
const api_error_1 = require("../helpers/api-error");
const user_repository_1 = require("../repositories/user-repository");
class AuthenticateUserService {
    async execute(createUserDTO) {
        if (!createUserDTO.name) {
            throw new api_error_1.BadRequestError('Mandatory field [name] not found!');
        }
        if (!createUserDTO.email) {
            throw new api_error_1.BadRequestError('Mandatory field [email] not found!');
        }
        if (!createUserDTO.password) {
            throw new api_error_1.BadRequestError('Mandatory field [password] not found!');
        }
        const exist = await user_repository_1.userRepository.findOne({ where: { email: createUserDTO.email } });
        if (exist) {
            throw new api_error_1.DuplicityError(`Email [${createUserDTO.email}] already in use.`);
        }
        const user = user_repository_1.userRepository.create(createUserDTO);
        await user_repository_1.userRepository.save(user);
        return user;
    }
}
exports.AuthenticateUserService = AuthenticateUserService;
