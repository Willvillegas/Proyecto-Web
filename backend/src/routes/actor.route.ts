/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { ActorController } from "../controllers/actor.controller";
import { upload } from "../middlewares/multer.middleware";

const router: Router = express.Router();


router.get("/actors", ActorController.getAll as any);
router.get("/actors/:id", ActorController.getById as any);
router.post("/actors", ActorController.create as any);
router.put("/actors", ActorController.update as any);

/**
 * Images upload for actors
 */
router.post("/actors/:id/upload", upload.array('images', 12), ActorController.setImages as any);
router.post("/actors/:id/set-cover", upload.single('principal'), ActorController.setCover as any);

export default router;