/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFilterMovie, IMovie } from "../interfaces/movie.interface";
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
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const offset = parseInt(req.query.offset as string) || 0;
            const limit = parseInt(req.query.limit as string) || 10;

            //Filters
            const filters: IFilterMovie = req.query as any;

            const movies = await MovieService.findAll(filters, offset, limit);
            const total = await MovieService.count(filters);

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
            const { id } = req.params;
            const { actorId } = req.body;
            const updatedMovie = await MovieService.addActor(id, actorId);
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
            const { id, actorId } = req.params;
            const updatedMovie = await MovieService.removeActor(id, actorId);
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
     * Set images to a movie (default all images is not cover)
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async uploadImages(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const images = req.files as Express.Multer.File[];
            //verify if the images are not empty
            if (!images || images.length === 0) {
                return res.status(400).json({ message: "At least one image is required" });
            }
            const updatedMovie = await MovieService.setImages(id, images);
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
     * Set a cover to a movie
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async setCover(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const cover = req.file as Express.Multer.File;
            //validate if cover is not empty
            if (!cover) {
                return res.status(400).json({ message: "Cover is required" });
            }
            const updatedMovie = await MovieService.setCover(id, cover);
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
     * Delete a movie by id
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const movie = await MovieService.remove(id);
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
}