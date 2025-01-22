/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { ActorController } from "../controllers/actor.controller";

const router: Router = express.Router();

// TODO: resolver los errores que aparecen, no entiendo que sucede.....

router.get("/actors", ActorController.getAll as any);
router.get("/actors/:id", ActorController.getById as any);
router.post("/actors", ActorController.create as any);

export default router;