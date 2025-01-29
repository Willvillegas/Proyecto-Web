"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorController = void 0;
const actor_service_1 = require("../services/actor.service");
class ActorController {
    /**
     * Create a new actor
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const actorData = req.body;
                const newActor = yield actor_service_1.ActorService.create(actorData);
                return res.status(201).json(newActor);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Get all actors
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = parseInt(req.query.limit) || 10;
                const offset = parseInt(req.query.offset) || 0;
                const actors = yield actor_service_1.ActorService.findAll();
                const total = yield actor_service_1.ActorService.count();
                return res.status(200).json({
                    data: actors,
                    total,
                    offset,
                    limit,
                    pages: Math.ceil(total / limit)
                });
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Get an actor by id
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const actor = yield actor_service_1.ActorService.findById(id);
                if (!actor) {
                    return res.status(404).json({ message: "Actor not found" });
                }
                return res.status(200).json(actor);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Update an actor by id
     * @param req Request Body = IActor
     * @param res Response
     * @returns Promise<Response>
     */
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const actorData = req.body;
                const actor = yield actor_service_1.ActorService.update(actorData);
                if (!actor) {
                    return res.status(404).json({ message: "Actor not found" });
                }
                return res.status(200).json(actor);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Set images for an actor
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     *
     */
    static setImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const images = req.files;
                const actor = yield actor_service_1.ActorService.setImages(id, images);
                if (!actor) {
                    return res.status(404).json({ message: "Actor not found" });
                }
                return res.status(200).json(actor);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Set a cover image for an actor
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static setCover(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const image = req.file;
                const actor = yield actor_service_1.ActorService.setCover(id, image);
                if (!actor) {
                    return res.status(404).json({ message: "Actor not found" });
                }
                return res.status(200).json(actor);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
    /**
     * Delete an actor by id
     * @param req Request
     * @param res Response
     * @returns Promise<Response>
     */
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const actor = yield actor_service_1.ActorService.remove(id);
                if (!actor) {
                    return res.status(404).json({ message: "Actor not found" });
                }
                return res.status(200).json(actor);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(500).json({ message: "An unknown error occurred" });
            }
        });
    }
}
exports.ActorController = ActorController;
