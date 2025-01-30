"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("../controllers/movie.controller");
const router = express_1.default.Router();
router.route("/movies")
    .get(movie_controller_1.MovieController.getAll)
    .post(movie_controller_1.MovieController.create);
router.route("/movies/:id")
    .get(movie_controller_1.MovieController.getById)
    .delete(movie_controller_1.MovieController.delete)
    .put(movie_controller_1.MovieController.update);
// Endpoints with images actions not available in the frontend
// router.post("/movies/:id/upload", upload.array('images', 12), MovieController.uploadImages as any);
// router.post("/movies/:id/set-cover", upload.single('cover'), MovieController.setCover as any);
// Endpoints with movies and actor actions
router.post("/movies/:id/actors", movie_controller_1.MovieController.addActor);
router.delete("/movies/:id/actors/:actorId", movie_controller_1.MovieController.removeActor);
exports.default = router;
