"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    isCover: { type: Boolean, default: false },
});
const movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    cast: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Actor'
        }],
    releaseYear: { type: Number, required: true },
    rating: { type: String, required: true },
    posters: {
        type: [imageSchema],
        default: []
    },
    clasification: { type: String, required: true }
});
exports.Movie = (0, mongoose_1.model)('Movie', movieSchema);
