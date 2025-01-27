/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { upload } from "../middlewares/multer.middleware";

const router: Router = express.Router();


router.get("/movies", MovieController.getAll as any);
router.post("/movies", MovieController.create as any);
router.put("/movies", MovieController.update as any);
router.get("/movies/:id", MovieController.getById as any);
router.delete("/movies/:id", MovieController.delete as any);
//Image upload
// router.post("/movies/upload", upload.array('images', 12), (req, res) => {
//     res.json(req.files);
// });
router.post("/movies/:id/upload", upload.array('images', 12), MovieController.uploadImages as any);
router.post("/movies/:id/set-cover", upload.single('cover'), MovieController.setCover as any);

// Endpoints with movies and actor actions
router.post("/movies/:id/actors", MovieController.addActor as any);
router.delete("/movies/:id/actors/:actorId", MovieController.removeActor as any);


export default router;