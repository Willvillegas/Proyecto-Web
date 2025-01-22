import { IMovie } from "../interfaces/movie.interface";
import { MovieRepository } from "../repositories/movie.repository";

export class MovieService {
    /**
     * Creates a new movie in the database
     * @param movie Interface IMovie 
     * @returns Promise<IMovie>
     */
    static async create(movie: IMovie): Promise<IMovie> {
        return MovieRepository.create(movie);
    }

    /**
     * Retrieves all movies from the database with pagination
     * @param offset number
     * @param limit number
     * @returns Promise<IMovie[]>
     */
    static async findAll(offset: number, limit: number): Promise<IMovie[]> {
        return MovieRepository.findAll(offset, limit);
    }

    /**
     * Retrieves a single movie by ID
     * @param id string
     * @returns Promise<IMovie>
     */
    static async findById(id: string): Promise<IMovie | null> {
        return MovieRepository.findById(id);
    }

    /**
     * Updates a movie by ID
     * @param movie Interface IMovie
     * @returns Promise<IMovie | null>
     */
    static async update(movie: IMovie): Promise<IMovie | null> {
        return MovieRepository.update(movie);
    }

    /**
     * add an actor to a cast
     * @param movieId string
     * @param actorId string
     * @returns Promise<IMovie | null>
     */
    static async addActor(movieId: string, actorId: string): Promise<IMovie | null> {
        const movie = await MovieRepository.findById(movieId);
        if (!movie) return null;
        movie.cast.push(actorId);
        return MovieRepository.update(movie);
    }

    /**
     * remove an actor from a cast
     * @param movieId string
     * @param actorId string
     * @returns Promise<IMovie | null>
     */
    static async removeActor(movieId: string, actorId: string): Promise<IMovie | null> {
        const movie = await MovieRepository.findById(movieId);
        if (!movie) return null;
        movie.cast = movie.cast.filter((id) => id !== actorId);
        return MovieRepository.update(movie);
    }

    /**
     * get all number of movies
     * @returns Promise<number>
     */
    static async count(): Promise<number> {
        return MovieRepository.count();
    }

}