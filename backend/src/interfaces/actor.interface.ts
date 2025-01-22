import { Document } from "mongoose";
export interface IActor extends Document {
    name: string;
    birthday: string;
    biography: string;
    movies: string[];
}

