import { IActor } from "../interfaces/actor.interface";
import { ActorRepository } from "../repositories/actor.repository";


export class ActorService {
    /**
     * Creates a new actor in the database
     * @param actor Interface IActor 
     * @returns Promise<IActor>
     */
    static async create(actor: IActor): Promise<IActor> {
        return ActorRepository.create(actor);
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

}