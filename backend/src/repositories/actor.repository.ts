import { Actor } from "../models/actor.model";
import { Movie } from "../models/movie.model";
import { IActor } from "../interfaces/actor.interface";
import { Types } from "mongoose";

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
        return Actor.find().populate('movies', ['title', 'releaseYear']).exec();
    }

    /**
     * Retrieves a single actor by ID
     * @param id string
     * @returns Promise<IActor>
     */
    static async findById(id: string): Promise<IActor | null> {
        return Actor.findById(id).populate('movies', ['title', 'releaseYear']).exec();
    }

    /**
     * Updates an actor by ID
     * @param id string
     * @param actor Interface IActor
     * @returns Promise<IActor | null>
     */
    static async update(actor: IActor): Promise<IActor | null> {
        return Actor.findByIdAndUpdate(actor._id, actor, { new: true }).exec();
    }
    /**
     * Counts the number of actors in the database
     */
    static async count(): Promise<number> {
        return Actor.countDocuments().exec();
    }

    /**
     * Deletes an actor by ID
     * @param id string
     * @returns Promise<IActor | null>
     */
    static async remove(id: string): Promise<IActor | null> {
        if (!Actor.findById(id)) return null;
        await Movie.updateMany(
            { cast: new Types.ObjectId(id) },
            { $pull: { cast: new Types.ObjectId(id) } }
        ).exec();

        return Actor.findByIdAndDelete(id).exec();
    }

}