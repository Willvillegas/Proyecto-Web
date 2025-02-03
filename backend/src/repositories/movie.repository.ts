/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFilterMovie, IImage, IMovie } from "../interfaces/movie.interface";
import { Movie } from "../models/movie.model";
import { Actor } from "../models/actor.model";
import { Types } from "mongoose";

export class MovieRepository {
    /**
     * Creates a new movie in the database
     * @param movie Interface IMovie 
     * @returns Promise<IMovie>
     */
    static async create(movie: IMovie): Promise<IMovie> {
        const newMovie = new Movie(movie);
        return newMovie.save();
    }

    /**
     * Retrieves all movies from the database with pagination
     * @param offset number
     * @param limit number
     * @returns Promise<IMovie[]>
     */
    static async findAll(filters: IFilterMovie, offset: number, limit: number): Promise<IMovie[]> {
        const query: any = {};
        if (filters.clasification) {
            query['clasification'] = { $regex: filters.clasification, $options: 'i' };
        }
        if (filters.genre) {
            query['genre'] = { $regex: filters.genre, $options: 'i' };
        }
        if (filters.releaseYear) {
            query['releaseYear'] = parseInt(filters.releaseYear as string, 10);
        }
        if (filters.search) {
            query['title'] = { $regex: filters.search, $options: 'i' };
        }



        return Movie.find(query)
            .skip(offset)
            .limit(limit)
            .populate('cast', 'name')
            .exec();
    }

    /**
     * Retrieves a single movie by ID
     * @param id string
     * @returns Promise<IMovie>
     */
    static async findById(id: string): Promise<IMovie | null> {
        return Movie.findById(id).populate('cast', 'name').exec();
    }

    /**
     * Updates a movie by ID
     * @param id string
     * @param movie Interface IMovie
     * @returns Promise<IMovie | null>
     */
    static async update(movie: IMovie): Promise<IMovie | null> {
        return Movie.findByIdAndUpdate(movie._id, movie, { new: true }).exec();
    }

    /**
     * get all number of movies
     * @returns Promise<number>
     */
    static async count(filters: IFilterMovie): Promise<number> {
        const query: any = {};
        if (filters.clasification) {
            query['clasification'] = { $regex: filters.clasification, $options: 'i' };
        }
        if (filters.genre) {
            query['genre'] = { $regex: filters.genre, $options: 'i' };
        }
        if (filters.releaseYear) {
            query['releaseYear'] = parseInt(filters.releaseYear as string, 10);
        }
        if (filters.search) {
            query['title'] = { $regex: filters.search, $options: 'i' };;
        }
        return Movie.countDocuments(query).exec();
    }

    /**
     * delete a movie by ID
     * @param id string
     * @returns Promise<IMovie | null>
     */
    static async remove(id: string): Promise<IMovie | null> {
        /**
         * Remove the movie from the actors
         */
        if (!Movie.findById(id)) {
            return null;
        }
        await Actor.updateMany(
            { movies: new Types.ObjectId(id) }, // Filtra los actores que tienen la película en su array 'movies'
            { $pull: { movies: new Types.ObjectId(id) } } // Elimina la referencia de la película del array 'movies'
        ).exec();
        return Movie.findByIdAndDelete(id).exec();
    }

    /**
 * Dado un id de una pelicula, 
 * recupera todos los actores que participaron en ella
 * y luego devuelve el id,nombre, y la imagen que es cover de cada actor
 * @param id string
 * @returns Promise<{_id:string,name:string,imageCover:IImage}[]>
 */
    static async getActors(id: string): Promise<{ _id: string, name: string, imageCover: IImage }[]> {
        const movie = await Movie.findById(id);
        if (!movie) {
            return [];
        }
        const actorsInMovie: { _id: string, name: string, imageCover: IImage }[] = []
        for (const actorId of movie.cast) {
            const actor = await Actor.findById(actorId);
            if (actor) {
                const imageCover: IImage = actor.images.find((image) => image.isCover)!;
                actorsInMovie.push({
                    _id: actor._id?.toString() || '',
                    name: actor.name,
                    imageCover: imageCover!,
                });
            }
        }
        return actorsInMovie;

    }

}
