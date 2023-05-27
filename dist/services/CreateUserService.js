"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const api_error_1 = require("../helpers/api-error");
const user_repository_1 = require("../repositories/user-repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateUserService {
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
        createUserDTO.password = await bcrypt_1.default.hash(createUserDTO.password, 10);
        const user = user_repository_1.userRepository.create(createUserDTO);
        await user_repository_1.userRepository.save(user);
        return user;
    }
}
exports.CreateUserService = CreateUserService;
