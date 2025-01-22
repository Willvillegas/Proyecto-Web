import { IMovie } from "../interfaces/movie.interface";
import { Movie } from "../models/movie.model";

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
    static async findAll(offset: number, limit: number): Promise<IMovie[]> {
        return Movie.find()
            .skip(offset)
            .limit(limit)
            .populate('cast')
            .exec();
    }

    /**
     * Retrieves a single movie by ID
     * @param id string
     * @returns Promise<IMovie>
     */
    static async findById(id: string): Promise<IMovie | null> {
        return Movie.findById(id).populate('cast').exec();
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
    static async count(): Promise<number> {
        return Movie.countDocuments().exec();
    }
}