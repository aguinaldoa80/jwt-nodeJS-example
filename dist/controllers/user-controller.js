"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const api_error_1 = require("../helpers/api-error");
const user_repository_1 = require("../repositories/user-repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        const userExists = await user_repository_1.userRepository.findOneBy({ email });
        if (userExists) {
            throw new api_error_1.BadRequestError('E-mail já existe');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = user_repository_1.userRepository.create({
            name,
            email,
            password: hashPassword,
        });
        await user_repository_1.userRepository.save(newUser);
        const { password: _, ...user } = newUser;
        return res.status(201).json(user);
    }
    async login(req, res) {
        const { email, password } = req.body;
        const user = await user_repository_1.userRepository.findOneBy({ email });
        if (!user) {
            throw new api_error_1.BadRequestError('E-mail ou senha inválidos');
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (!verifyPass) {
            throw new api_error_1.BadRequestError('E-mail ou senha inválidos');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
            expiresIn: '8h',
        });
        const { password: _, ...userLogin } = user;
        return res.json({
            user: userLogin,
            token: token,
        });
    }
    async getProfile(req, res) {
        return res.json(req.user);
    }
}
exports.UserController = UserController;
