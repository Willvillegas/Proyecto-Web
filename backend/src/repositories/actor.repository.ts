import { Actor } from "../models/actor.model";
import { IActor } from "../interfaces/actor.interface";

export class ActorRepository {
    /**
     * Creates a new actor in the database
     * @param actor Interface IActor 
     * @returns Promise<IActor>
     */
    static async create(actor: IActor): Promise<IActor> {
        const newActor = new Actor(actor);
        return newActor.save();
    }

    /**
     * Retrieves all actors from the database
     * @returns Promise<IActor[]>
     */
    static async findAll(): Promise<IActor[]> {
        return Actor.find().populate('movies').exec();
    }

    /**
     * Retrieves a single actor by ID
     * @param id string
     * @returns Promise<IActor>
     */
    static async findById(id: string): Promise<IActor | null> {
        return Actor.findById(id).populate('movies').exec();
    }

    /**
     * Updates an actor by ID
     * @param id string
     * @param actor Interface IActor
     * @returns Promise<IActor | null>
     */
    static async update( actor: IActor): Promise<IActor | null> {
        return Actor.findByIdAndUpdate (actor._id, actor, {new: true}).exec();
    }

}