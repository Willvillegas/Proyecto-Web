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
exports.ActorService = void 0;
const actor_repository_1 = require("../repositories/actor.repository");
const movie_repository_1 = require("../repositories/movie.repository");
class ActorService {
    /**
     * Creates a new actor in the database
     * @param actor Interface IActor
     * @returns Promise<IActor>
     */
    static create(actor) {
        return __awaiter(this, void 0, void 0, function* () {
            const actorCreated = yield actor_repository_1.ActorRepository.create(actor);
            // add actor to movies
            actor.movies.forEach(element => {
                movie_repository_1.MovieRepository.findById(element).then((movie) => __awaiter(this, void 0, void 0, function* () {
                    if (movie) {
                        movie.cast.push(actorCreated._id);
                        yield movie_repository_1.MovieRepository.update(movie);
                    }
                }));
            });
            return actorCreated;
        });
    }
    /**
     * Retrieves all actors from the database
     * @returns Promise<IActor[]>
     */
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return actor_repository_1.ActorRepository.findAll();
        });
    }
    /**
     * Retrieves a single actor by ID
     * @param id string
     * @returns Promise<IActor>
     */
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return actor_repository_1.ActorRepository.findById(id);
        });
    }
    /**
     * Updates an actor by ID
     * @param actor Interface IActor
     * @returns Promise<IActor | null>
     */
    static update(actor) {
        return __awaiter(this, void 0, void 0, function* () {
            return actor_repository_1.ActorRepository.update(actor);
        });
    }
    /**
     * COunts the number of actors in the database
     * @returns Promise<number>
     */
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            return actor_repository_1.ActorRepository.count();
        });
    }
    /**
     * set images for an actor
     * @param actorId string
     * @param images Express.Multer.File[]
     * @returns Promise<IActor | null>
     */
    static setImages(actorId, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const actor = yield actor_repository_1.ActorRepository.findById(actorId);
            if (!actor)
                return null;
            actor.images.push(...images.map((image) => ({
                url: image.filename,
                isCover: false
            })));
            return actor_repository_1.ActorRepository.update(actor);
        });
    }
    /**
     * adds a principal image to an actor
     * @param actorId string
     * @param image Express.Multer.File
     * @returns Promise<IActor | null>
     */
    static setCover(actorId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const actor = yield actor_repository_1.ActorRepository.findById(actorId);
            if (!actor)
                return null;
            actor.images.forEach((img) => img.isCover = false);
            actor.images.push({
                url: image.filename,
                isCover: true
            });
            return actor_repository_1.ActorRepository.update(actor);
        });
    }
    /**
     * Remove actor by ID
     */
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return actor_repository_1.ActorRepository.remove(id);
        });
    }
}
exports.ActorService = ActorService;
