/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { ActorController } from "../controllers/actor.controller";
import { upload } from "../middlewares/multer.middleware";

const router: Router = express.Router();

router.route("/actors/:id")
    .get(ActorController.getById as any)
    .delete(ActorController.delete as any);
router.route("/actors")
    .get(ActorController.getAll as any)
    .post(ActorController.create as any)
    .put(ActorController.update as any);

/**
 * Images upload for actors
 */
router.post("/actors/:id/upload", upload.array('images', 12), ActorController.setImages as any);
router.post("/actors/:id/set-cover", upload.single('principal'), ActorController.setCover as any);

export default router;