"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const movie_service_1 = require("../services/movie.service");
class MovieController {
    /**
     * Create a new movie
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieData = req.body;
                const newMovie = yield movie_service_1.MovieService.create(movieData);
                return res.status(201).json(newMovie);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Get all movies with pagination
     * @param req Request
     * query params: offset, limit, clasification, genre, releaseYear
     * - offset: number of records to skip (default 0)
     * - limit: number of records to return (default 10)
     * - clasification: filter by clasification
     * - genre: filter by genre
     * - releaseYear: filter by release year
     *
     * @param res Response
     * @returns Promise<Response>
     */
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offset = parseInt(req.query.offset) || 0;
                const limit = parseInt(req.query.limit) || 10;
                //Filters
                const filters = req.query;
                const movies = yield movie_service_1.MovieService.findAll(filters, offset, limit);
                const total = yield movie_service_1.MovieService.count(filters);
                //transform the response
                return res.status(200)
                    .json({
                    data: movies,
                    total,
                    offset,
                    limit,
                    pages: Math.ceil(total / limit)
                });
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Get a movie by id
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const movie = yield movie_service_1.MovieService.findById(id);
                if (!movie) {
                    return res.status(404).json({ message: "Movie not found" });
                }
                return res.status(200).json(movie);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Update a movie by id
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieData = req.body;
                const updatedMovie = yield movie_service_1.MovieService.update(movieData);
                if (!updatedMovie) {
                    return res.status(404).json({ message: "Movie not found" });
                }
                return res.status(200).json(updatedMovie);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Add an actor to a movie
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static addActor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { actorId } = req.body;
                const updatedMovie = yield movie_service_1.MovieService.addActor(id, actorId);
                if (!updatedMovie) {
                    return res.status(404).json({ message: "Movie not found" });
                }
                return res.status(200).json(updatedMovie);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Remove an actor from a movie
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static removeActor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, actorId } = req.params;
                const updatedMovie = yield movie_service_1.MovieService.removeActor(id, actorId);
                if (!updatedMovie) {
                    return res.status(404).json({ message: "Movie not found" });
                }
                return res.status(200).json(updatedMovie);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Set images to a movie (default all images is not cover)
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static uploadImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const images = req.files;
                //verify if the images are not empty
                if (!images || images.length === 0) {
                    return res.status(400).json({ message: "At least one image is required" });
                }
                const updatedMovie = yield movie_service_1.MovieService.setImages(id, images);
                if (!updatedMovie) {
                    return res.status(404).json({ message: "Movie not found" });
                }
                return res.status(200).json(updatedMovie);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Set a cover to a movie
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static setCover(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cover = req.file;
                //validate if cover is not empty
                if (!cover) {
                    return res.status(400).json({ message: "Cover is required" });
                }
                const updatedMovie = yield movie_service_1.MovieService.setCover(id, cover);
                if (!updatedMovie) {
                    return res.status(404).json({ message: "Movie not found" });
                }
                return res.status(200).json(updatedMovie);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Delete a movie by id
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const movie = yield movie_service_1.MovieService.remove(id);
                if (!movie) {
                    return res.status(404).json({ message: "Movie not found" });
                }
                return res.status(200).json(movie);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
}
exports.MovieController = MovieController;
