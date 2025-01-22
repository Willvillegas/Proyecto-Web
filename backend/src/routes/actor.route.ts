/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { ActorController } from "../controllers/actor.controller";

const router: Router = express.Router();


router.get("/actors", ActorController.getAll as any);
router.get("/actors/:id", ActorController.getById as any);
router.post("/actors", ActorController.create as any);
router.put("/actors", ActorController.update as any);

export default router;