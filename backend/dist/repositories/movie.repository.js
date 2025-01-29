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
exports.MovieRepository = void 0;
const movie_model_1 = require("../models/movie.model");
const actor_model_1 = require("../models/actor.model");
class MovieRepository {
    /**
     * Creates a new movie in the database
     * @param movie Interface IMovie
     * @returns Promise<IMovie>
     */
    static create(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMovie = new movie_model_1.Movie(movie);
            return newMovie.save();
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
            const query = {};
            if (filters.clasification) {
                query['clasification'] = filters.clasification;
            }
            if (filters.genre) {
                query['genre'] = { $regex: filters.genre, $options: 'i' };
            }
            if (filters.releaseYear) {
                query['releaseYear'] = parseInt(filters.releaseYear, 10);
            }
            return movie_model_1.Movie.find(query)
                .skip(offset)
                .limit(limit)
                .populate('cast', 'name')
                .exec();
        });
    }
    /**
     * Retrieves a single movie by ID
     * @param id string
     * @returns Promise<IMovie>
     */
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return movie_model_1.Movie.findById(id).populate('cast', 'name').exec();
        });
    }
    /**
     * Updates a movie by ID
     * @param id string
     * @param movie Interface IMovie
     * @returns Promise<IMovie | null>
     */
    static update(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            return movie_model_1.Movie.findByIdAndUpdate(movie._id, movie, { new: true }).exec();
        });
    }
    /**
     * get all number of movies
     * @returns Promise<number>
     */
    static count(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (filters.clasification) {
                query['clasification'] = filters.clasification;
            }
            if (filters.genre) {
                query['genre'] = filters.genre;
            }
            if (filters.releaseYear) {
                query['releaseYear'] = parseInt(filters.releaseYear, 10);
            }
            return movie_model_1.Movie.countDocuments(query).exec();
        });
    }
    /**
     * delete a movie by ID
     * @param id string
     * @returns Promise<IMovie | null>
     */
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Remove the movie from the actors
             */
            if (!movie_model_1.Movie.findById(id)) {
                return null;
            }
            yield actor_model_1.Actor.updateMany({ 'movies': { id } }, { $pull: { 'movies': id } }).exec();
            return movie_model_1.Movie.findByIdAndDelete(id).exec();
        });
    }
}
exports.MovieRepository = MovieRepository;
