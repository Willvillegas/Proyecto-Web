import { Document } from "mongoose";

export interface IMovie extends Document {
    title: string;
    description: string;
    genre: string;
    director: string;
    cast: string[];
    year: number;
    rating: string;
}