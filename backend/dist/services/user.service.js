"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const JWT_1 = require("../utils/JWT");
class UserService {
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.UserRepository.create(user);
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.UserRepository.findAll();
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.UserRepository.findById(id);
        });
    }
    static update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_repository_1.UserRepository.update(user);
        });
    }
    /**
     * login user
     */
    static login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //find user by username
            const user = yield user_repository_1.UserRepository.findByUsername(username);
            // if user is found, generate token
            if (!user)
                return null;
            //compare password
            if (user.password === password) {
                const token = (0, JWT_1.jwtGenerate)(user);
                return token;
            }
            return null;
        });
    }
}
exports.UserService = UserService;
