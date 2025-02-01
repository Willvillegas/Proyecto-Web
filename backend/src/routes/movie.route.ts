/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { MovieController } from "../controllers/movie.controller";


const router: Router = express.Router();
router.route("/movies")
    .get(MovieController.getAll as any)
    .post(MovieController.create as any);

router.route("/movies/:id")
    .get(MovieController.getById as any)
    .delete(MovieController.delete as any)
    .put(MovieController.update as any);

// Endpoints with images actions not available in the frontend
// router.post("/movies/:id/upload", upload.array('images', 12), MovieController.uploadImages as any);
// router.post("/movies/:id/set-cover", upload.single('cover'), MovieController.setCover as any);

// Endpoints with movies and actor actions
router.post("/movies/:id/actors", MovieController.addActor as any);
router.delete("/movies/:id/actors/:actorId", MovieController.removeActor as any);

/**
 * Get all actors from a movie
 */
router.get("/movies/:id/actors", MovieController.getActors as any);


export default router;