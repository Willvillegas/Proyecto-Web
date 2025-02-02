/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { ActorController } from "../controllers/actor.controller";


const router: Router = express.Router();

router.route("/actors/:id")
    .get(ActorController.getById as any)
    .delete(ActorController.delete as any)
    .put(ActorController.update as any);
router.route("/actors")
    .get(ActorController.getAll as any)
    .post(ActorController.create as any);

/**
 * Images upload for actors
 * not implemented in the frontend
 */
// router.post("/actors/:id/upload", upload.array('images', 12), ActorController.setImages as any);
// router.post("/actors/:id/set-cover", upload.single('principal'), ActorController.setCover as any);

export default router;