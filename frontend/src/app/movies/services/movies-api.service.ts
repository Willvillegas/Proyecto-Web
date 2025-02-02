import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { MovieApi, MovieResponse } from '../interfaces/movieApi.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  private apiUrl = `${environment.apiUrl}/movies`;
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllMovies(): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(`${this.apiUrl}`);
  }

  getMovies(limit?: number): Observable<MovieApi[]> {
    let query = new HttpParams();
        if (limit) {
          query = query.set('limit', limit.toString());
        }
    
        return this.httpClient.get<MovieResponse>(`${this.apiUrl}`, { params: query })
          .pipe(
            map(response => response.data) // Extrae solo la lista de actores
          );
  }

  getMovieById(id: string): Observable<MovieApi> {
    return this.httpClient.get<MovieApi>(`${this.apiUrl}/${id}`)
  }
  createMovie(movie: MovieApi): Observable<MovieApi> {
    return this.httpClient.post<MovieApi>(`${this.apiUrl}`, movie);
  }
  
  getMoviesPage(limit: number, offset: number): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }
  
  searchMovies(query: string): Observable<MovieApi[]> {
    return this.httpClient
      .get<{ data: MovieApi[] }>(`${this.apiUrl}?search=${query}`)
      .pipe(map(response => response.data));
  }
  
  updateMovie(movie: MovieApi): Observable<MovieApi> {
    return this.httpClient.put<MovieApi>(`${this.apiUrl}/${movie._id}`, movie);
  }
  
  
  // Eliminar una película por su ID
  deleteMovie(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
  
 
  getUniqueFilterOptions(): Observable<{ genres: string[]; years: string[]; ratings: string[] }> {
    return this.httpClient.get<MovieResponse>(`${this.apiUrl}`).pipe(
      map(response => {
        const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance']; 
        const ratings = [...new Set(response.data.map(movie => movie.clasification || ''))];

        return { genres, years: [], ratings }; // No cargamos años dinámicamente
      })
    );
  }

  getFilteredMovies(
    genre?: string,
    year?: string,
    rating?: string,
    limit: number = 10,
    offset: number = 0
  ): Observable<MovieResponse> {
    let params = new HttpParams();

    if (genre) {
      params = params.set('genre', genre);
    }
    if (year) {
      params = params.set('releaseYear', year);
    }
    if (rating) {
      params = params.set('clasification', rating);
    }

    params = params.set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get<MovieResponse>(`${this.apiUrl}`, { params });
  }
}