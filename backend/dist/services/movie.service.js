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
exports.MovieService = void 0;
const actor_repository_1 = require("../repositories/actor.repository");
const movie_repository_1 = require("../repositories/movie.repository");
class MovieService {
    /**
     * Creates a new movie in the database
     * @param movie Interface IMovie
     * @returns Promise<IMovie>
     */
    static create(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdMovie = yield movie_repository_1.MovieRepository.create(movie);
            movie.cast.forEach(element => {
                actor_repository_1.ActorRepository.findById(element).then((actor) => __awaiter(this, void 0, void 0, function* () {
                    if (actor) {
                        actor.movies.push(createdMovie._id);
                        yield actor_repository_1.ActorRepository.update(actor);
                    }
                }));
            });
            return createdMovie;
        });
    }
    /**
     * Retrieves all movies from the database with pagination
     * @param offset number
     * @param limit number
     * @returns Promise<IMovie[]>
     */
    static findAll(filters, offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return movie_repository_1.MovieRepository.findAll(filters, offset, limit);
        });
    }
    /**
     * Retrieves a single movie by ID
     * @param id string
     * @returns Promise<IMovie>
     */
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return movie_repository_1.MovieRepository.findById(id);
        });
    }
    /**
     * Updates a movie by ID
     * @param movie Interface IMovie
     * @returns Promise<IMovie | null>
     */
    static update(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            return movie_repository_1.MovieRepository.update(movie);
        });
    }
    /**
     * add an actor to a cast
     * @param movieId Identifier of the movie
     * @param actorId Identifier of the actor
     * @returns Promise<IMovie | null>
     */
    static addActor(movieId, actorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield movie_repository_1.MovieRepository.findById(movieId);
            const actor = yield actor_repository_1.ActorRepository.findById(actorId);
            if (!movie || !actor)
                return null;
            movie.cast.push(actorId);
            actor.movies.push(movieId);
            yield actor_repository_1.ActorRepository.update(actor);
            return movie_repository_1.MovieRepository.update(movie);
        });
    }
    /**
     * remove an actor from a cast
     * @param movieId string
     * @param actorId string
     * @returns Promise<IMovie | null>
     */
    static removeActor(movieId, actorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield movie_repository_1.MovieRepository.findById(movieId);
            if (!movie)
                return null;
            movie.cast = movie.cast.filter((id) => id !== actorId);
            return movie_repository_1.MovieRepository.update(movie);
        });
    }
    /**
     * get all number of movies
     * @returns Promise<number>
     */
    static count(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return movie_repository_1.MovieRepository.count(filters);
        });
    }
    /**
     * set images to a movie
     */
    static setImages(id, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield movie_repository_1.MovieRepository.findById(id);
            if (!movie)
                return null;
            movie.posters.push(...images.map((image) => ({
                url: image.filename, // Usa image.filename para la URL
                isCover: false // Establece isCover como false
            })));
            return movie_repository_1.MovieRepository.update(movie);
        });
    }
    /**
     * set cover to a movie
     */
    static setCover(id, cover) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield movie_repository_1.MovieRepository.findById(id);
            if (!movie)
                return null;
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
            return movie_repository_1.MovieRepository.update(movie);
        });
    }
    /**
     * remove a movie by ID
     */
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return movie_repository_1.MovieRepository.remove(id);
        });
    }
}
exports.MovieService = MovieService;
