import { Document } from "mongoose";

export interface IMovie extends Document {
    title: string;
    description: string;
    genre: string;
    director: string;
    cast: string[];
    releaseYear: number;
    rating: string;
    posters: IImage[];
    clasification: string;
}

export interface IImage {
    url: string;
    isCover: boolean;
}

export interface IFilterMovie {
    genre?: string;
    releaseYear?: string;
    clasification?: string;
}