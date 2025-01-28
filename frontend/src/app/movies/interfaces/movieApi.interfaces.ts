export interface MovieResponse {
    data: MovieApi[];
    total: number;
    offset: number;
    limit: number;
    pages: number;
}

export interface MovieApi {
    _id?: string;
    title: string;
    description: string;
    genre: string;
    director: string;
    cast: ActorPreview[];
    releaseYear: number;
    rating: string;
    posters: Poster[];
    __v?: number;
    clasification?: string;
}

export interface ActorPreview {
    _id?: string;
    name: string;
}

export interface Poster {
    url: string;
    isCover: boolean;
    _id?: string;
}
