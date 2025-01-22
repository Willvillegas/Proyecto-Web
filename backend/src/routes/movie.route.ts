/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { MovieController } from "../controllers/movie.controller";

const router: Router = express.Router();

router.get("/movies", MovieController.getAll as any);
router.get("/movies/:id", MovieController.getById as any);
router.post("/movies", MovieController.create as any);
router.put("/movies", MovieController.update as any);

// Endpoints with movies and actor actions
router.post("/movies/:id/actors", MovieController.addActor as any);
router.delete("/movies/:id/actors/:actorId", MovieController.removeActor as any);


export default router;