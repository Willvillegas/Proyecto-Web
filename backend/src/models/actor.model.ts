import { Schema,model } from "mongoose";
import { IActor } from "../interfaces/actor.interface";

const actorSchema = new Schema<IActor>({
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    biography: { type: String, required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

export const Actor = model<IActor>('Actor', actorSchema);