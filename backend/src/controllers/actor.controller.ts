import { IActor } from "../interfaces/actor.interface";
import { ActorService } from "../services/actor.service";
import { Request, Response } from "express";

export class ActorController {
    /**
     * Create a new actor
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const actorData: IActor = req.body;
            const newActor = await ActorService.create(actorData);
            return res.status(201).json(newActor);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    /**
     * Get all actors
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = parseInt(req.query.offset as string) || 0;
            const actors = await ActorService.findAll();
            const total = await ActorService.count();
            return res.status(200).json({
                data: actors,
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
     * Get an actor by id
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const actor = await ActorService.findById(id);
            if (!actor) {
                return res.status(404).json({ message: "Actor not found" });
            }
            return res.status(200).json(actor);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    /**
     * Update an actor by id
     * @param req Request Body = IActor
     * @param res Response
     * @returns Promise<Response>
     */
    static async update(req: Request, res: Response): Promise<Response> {
        try {
            const actorData: IActor = req.body;
            const actor = await ActorService.update(actorData);
            if (!actor) {
                return res.status(404).json({ message: "Actor not found" });
            }
            return res.status(200).json(actor);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}