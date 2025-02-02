export interface ActorResponse {
    data: ActorApi[];
    total: number;
    offset: number;
    limit: number;
    pages: number;
}

export interface ActorApi {
    _id?: string;
    name: string;
    birthday: Date;
    biography: string;
    movies: MoviePreview[];
    images: Image[];
    __v?: number;
}

export interface Image {
    url: string;
    isCover: boolean;
    _id?: string;
}

export interface MoviePreview {
    _id?: string;
    title: string;
    releaseYear: number;  
    posterUrl?: string;  
}
