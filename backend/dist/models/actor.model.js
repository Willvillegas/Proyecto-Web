"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    isCover: { type: Boolean, default: false },
});
const actorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    biography: { type: String, required: true },
    movies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Movie' }],
    images: {
        type: [imageSchema],
        default: []
    }
});
exports.Actor = (0, mongoose_1.model)('Actor', actorSchema);
