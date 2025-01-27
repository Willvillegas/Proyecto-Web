import { UserController } from "../controllers/user.controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.route("/users")
    .post(UserController.create)
    .get(UserController.findAll)
    .put(UserController.update);
router.get("/users/:id", UserController.findById);
router.post("/users/login", UserController.login);

export default router;