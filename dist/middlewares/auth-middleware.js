"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_error_1 = require("../helpers/api-error");
const user_repository_1 = require("../repositories/user-repository");
const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new api_error_1.UnauthorizedError('Não autorizado');
    }
    const token = authorization.split(' ')[1];
    const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_PASS ?? '');
    const user = await user_repository_1.userRepository.findOneBy({ id });
    if (!user) {
        throw new api_error_1.UnauthorizedError('Não autorizado');
    }
    const { password: _, ...loggedUser } = user;
    //req.user = loggedUser
    next();
};
exports.authMiddleware = authMiddleware;
