import { Schema, model } from "mongoose";
import { IActor } from "../interfaces/actor.interface";
import { IImage } from "../interfaces/movie.interface";

const imageSchema = new Schema<IImage>({
    url: { type: String, required: true },
    isCover: { type: Boolean, default: false },
});

const actorSchema = new Schema<IActor>({
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    biography: { type: String, required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    images: {
        type: [imageSchema],
        default: []
    }
});

export const Actor = model<IActor>('Actor', actorSchema);