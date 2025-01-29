"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route("/users")
    .post(user_controller_1.UserController.create)
    .get(user_controller_1.UserController.findAll)
    .put(user_controller_1.UserController.update);
router.get("/users/:id", user_controller_1.UserController.findById);
router.post("/auth/login", user_controller_1.UserController.login);
exports.default = router;
