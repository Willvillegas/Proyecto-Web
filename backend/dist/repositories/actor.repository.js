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
exports.ActorRepository = void 0;
const actor_model_1 = require("../models/actor.model");
const movie_model_1 = require("../models/movie.model");
class ActorRepository {
    /**
     * Creates a new actor in the database
     * @param actor Interface IActor
     * @returns Promise<IActor>
     */
    static create(actor) {
        return __awaiter(this, void 0, void 0, function* () {
            const newActor = new actor_model_1.Actor(actor);
            return newActor.save();
        });
    }
    /**
     * Retrieves all actors from the database
     * @returns Promise<IActor[]>
     */
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return actor_model_1.Actor.find().populate('movies', ['title', 'releaseYear']).exec();
        });
    }
    /**
     * Retrieves a single actor by ID
     * @param id string
     * @returns Promise<IActor>
     */
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return actor_model_1.Actor.findById(id).populate('movies', ['title', 'releaseYear']).exec();
        });
    }
    /**
     * Updates an actor by ID
     * @param id string
     * @param actor Interface IActor
     * @returns Promise<IActor | null>
     */
    static update(actor) {
        return __awaiter(this, void 0, void 0, function* () {
            return actor_model_1.Actor.findByIdAndUpdate(actor._id, actor, { new: true }).exec();
        });
    }
    /**
     * Counts the number of actors in the database
     */
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            return actor_model_1.Actor.countDocuments().exec();
        });
    }
    /**
     * Deletes an actor by ID
     * @param id string
     * @returns Promise<IActor | null>
     */
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!actor_model_1.Actor.findById(id))
                return null;
            yield movie_model_1.Movie.updateMany({ cast: id }, { $pull: { cast: id } }).exec();
            return actor_model_1.Actor.findByIdAndDelete(id).exec();
        });
    }
}
exports.ActorRepository = ActorRepository;
