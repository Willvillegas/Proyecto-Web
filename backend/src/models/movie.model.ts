import { model, Schema } from "mongoose";
import { IMovie } from "../interfaces/movie.interface";

const movieSchema = new Schema<IMovie>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    cast: [{
        type: Schema.Types.ObjectId, ref: 'Actor'
    }],
    releaseYear: { type: Number, required: true },
    rating: { type: String, required: true },
    posters: [{
        url: { type: String, required: true },
        isCover: { type: Boolean, required: true }
    }]
});

export const Movie = model<IMovie>('Movie', movieSchema);
