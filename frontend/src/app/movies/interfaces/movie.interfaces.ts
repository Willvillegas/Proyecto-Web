export interface Movie {
    id: string; 
    title: string; 
    description: string; 
    genre: string; 
    director: string; 
    cast: string[]; // Lista de id de actores que forman el reparto
    releaseYear: number; 
    rating: number; // Calificación de la película
    posters: Image[]; // Lista de imágenes de la película
    classification: string;
  }
  
  export interface Image {
    url: string; // URL de la imagen
    isCover: boolean; // Indica si es la imagen de portada
  }
  