import { IActor } from "../interfaces/actor.interface";
import { ActorRepository } from "../repositories/actor.repository";
import { MovieRepository } from "../repositories/movie.repository";


export class ActorService {
    /**
     * Creates a new actor in the database
     * @param actor Interface IActor 
     * @returns Promise<IActor>
     */
    static async create(actor: IActor): Promise<IActor> {
        const actorCreated: IActor = await ActorRepository.create(actor);
        // add actor to movies
        actor.movies.forEach(element => {
            MovieRepository.findById(element).then(async (movie) => {
                if (movie) {
                    movie.cast.push(actorCreated._id as string);
                    await MovieRepository.update(movie);
                }
            });
        });
        return actorCreated;
    }

    /**
     * Retrieves all actors from the database
     * @returns Promise<IActor[]>
     */
    static async findAll(): Promise<IActor[]> {
        return ActorRepository.findAll();
    }

    /**
     * Retrieves a single actor by ID
     * @param id string
     * @returns Promise<IActor>
     */
    static async findById(id: string): Promise<IActor | null> {
        return ActorRepository.findById(id);
    }

    /**
     * Updates an actor by ID
     * @param actor Interface IActor
     * @returns Promise<IActor | null>
     */
    static async update(actor: IActor): Promise<IActor | null> {
        return ActorRepository.update(actor);
    }

    /**
     * COunts the number of actors in the database
     * @returns Promise<number>
     */
    static async count(): Promise<number> {
        return ActorRepository.count();
    }

    /**
     * set images for an actor
     * @param actorId string
     * @param images Express.Multer.File[]
     * @returns Promise<IActor | null>
     */
    static async setImages(actorId: string, images: Express.Multer.File[]): Promise<IActor | null> {
        const actor = await ActorRepository.findById(actorId);
        if (!actor) return null;
        actor.images.push(...images.map((image) => ({
            url: image.filename,
            isCover: false
        })));
        return ActorRepository.update(actor);
    }

    /**
     * adds a principal image to an actor
     * @param actorId string
     * @param image Express.Multer.File
     * @returns Promise<IActor | null>
     */
    static async setCover(actorId: string, image: Express.Multer.File): Promise<IActor | null> {
        const actor = await ActorRepository.findById(actorId);
        if (!actor) return null;
        actor.images.forEach((img) => img.isCover = false);
        actor.images.push({
            url: image.filename,
            isCover: true
        });
        return ActorRepository.update(actor);
    }

    /** 
     * Remove actor by ID
     */
    static async remove(id: string): Promise<IActor | null> {
        return ActorRepository.remove(id);
    }

}