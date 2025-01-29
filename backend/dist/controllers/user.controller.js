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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const newUser = yield user_service_1.UserService.create(user);
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    static findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.UserService.findAll();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    static findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield user_service_1.UserService.findById(id);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const updateUser = yield user_service_1.UserService.update(user);
                res.status(200).json(updateUser);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const token = yield user_service_1.UserService.login(username, password);
                if (token !== null) {
                    res.status(200).json(token);
                }
                else {
                    res.status(401).json("Invalid username or password");
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.UserController = UserController;
