import { IFilterMovie, IMovie } from "../interfaces/movie.interface";
import { ActorRepository } from "../repositories/actor.repository";
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
    static async findAll(filters: IFilterMovie, offset: number, limit: number): Promise<IMovie[]> {
        return MovieRepository.findAll(filters, offset, limit);
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
        const actor = await ActorRepository.findById(actorId);
        if (!movie || !actor) return null;
        movie.cast.push(actorId);
        actor.movies.push(movieId);
        await ActorRepository.update(actor);
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
    static async count(filters: IFilterMovie): Promise<number> {
        return MovieRepository.count(filters);
    }

    /**
     * set images to a movie
     */
    static async setImages(id: string, images: Express.Multer.File[]): Promise<IMovie | null> {
        const movie = await MovieRepository.findById(id);
        if (!movie) return null;

        movie.posters.push(...images.map((image) => ({
            url: image.filename,  // Usa image.filename para la URL
            isCover: false  // Establece isCover como false
        })));
        return MovieRepository.update(movie);
    }

    /**
     * set cover to a movie
     */
    static async setCover(id: string, cover: Express.Multer.File): Promise<IMovie | null> {
        const movie = await MovieRepository.findById(id);
        if (!movie) return null;
        //validate if any images in posters is cover
        movie.posters.forEach((image) => {
            if (image.isCover) {
                image.isCover = false;
            }
        });
        //set the new image as cover
        movie.posters.push({
            url: cover.filename,
            isCover: true
        });
        return MovieRepository.update(movie);
    }
}