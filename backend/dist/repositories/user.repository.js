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
exports.UserRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    /**
     * Creates a new user in the database
     * @param user Interface IUser
     * @returns Promise<IUser>
     */
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_model_1.User(user);
            return newUser.save();
        });
    }
    /**
     * Retrieves all users from the database
     * @returns Promise<IUser[]>
     */
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.find().exec();
        });
    }
    /**
     * Retrieves a single user by ID
     * @param id string
     * @returns Promise<IUser>
     */
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findById(id).exec();
        });
    }
    /**
     * Edits a user by ID
     * @param id string
     * @param user Interface IUser
     * @returns Promise<IUser | null>
     *
     */
    static update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findByIdAndUpdate(user._id, user, { new: true }).exec();
        });
    }
    /**
     * find user by username
     * @param username string
     * @returns Promise<IUser | null>
     */
    static findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.User.findOne({ username }).exec();
        });
    }
}
exports.UserRepository = UserRepository;
