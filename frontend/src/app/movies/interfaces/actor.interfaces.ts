export interface Actor {
  id: string;
  name: string; 
  birthDate: string; 
  biography: string; 
  posters: Poster[]; 
  movies: string[]; 
}

export interface Poster {
  url: string;
  isCover: boolean; 
}
