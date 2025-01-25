import { Document } from "mongoose";
import { IImage } from "./movie.interface";
export interface IActor extends Document {
    name: string;
    birthday: string;
    biography: string;
    movies: string[];
    images: IImage[];
}

