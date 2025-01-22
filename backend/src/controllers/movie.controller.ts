import { IMovie } from "../interfaces/movie.interface";
import { MovieService } from "../services/movie.service";
import { Request, Response } from "express";

export class MovieController {
    /**
     * Create a new movie
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const movieData: IMovie = req.body;
            const newMovie = await MovieService.create(movieData);
            return res.status(201).json(newMovie);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    /**
     * Get all movies with pagination
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const offset = parseInt(req.query.offset as string) || 0;
            const limit = parseInt(req.query.limit as string) || 10;
            const movies = await MovieService.findAll(offset, limit);
            const total = await MovieService.count();

            //transform the response
            return res.status(200)
                .json({
                    data: movies,
                    total,
                    offset,
                    limit,
                    pages: Math.ceil(total / limit)
                });
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    /**
     * Get a movie by id
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const movie = await MovieService.findById(id);
            if (!movie) {
                return res.status(404).json({ message: "Movie not found" });
            }
            return res.status(200).json(movie);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    /**
     * Update a movie by id
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */

    static async update(req: Request, res: Response): Promise<Response> {
        try {
            const movieData: IMovie = req.body;
            const updatedMovie = await MovieService.update(movieData);
            if (!updatedMovie) {
                return res.status(404).json({ message: "Movie not found" });
            }
            return res.status(200).json(updatedMovie);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    /**
     * Add an actor to a movie
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async addActor(req: Request, res: Response): Promise<Response> {
        try {
            const { movieId, actorId } = req.params;
            const updatedMovie = await MovieService.addActor(movieId, actorId);
            if (!updatedMovie) {
                return res.status(404).json({ message: "Movie not found" });
            }
            return res.status(200).json(updatedMovie);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    /**
     * Remove an actor from a movie
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async removeActor(req: Request, res: Response): Promise<Response> {
        try {
            const { movieId, actorId } = req.params;
            const updatedMovie = await MovieService.removeActor(movieId, actorId);
            if (!updatedMovie) {
                return res.status(404).json({ message: "Movie not found" });
            }
            return res.status(200).json(updatedMovie);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}