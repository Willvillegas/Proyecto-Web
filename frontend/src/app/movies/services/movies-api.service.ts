import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { MovieApi, MovieResponse } from '../interfaces/movieApi.interfaces';
import { HttpClient } from '@angular/common/http';
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

  getMovies(): Observable<MovieApi[]> {
    return this.httpClient.get<MovieApi[]>(`${this.apiUrl}`)
  }

  getMovieById(id: string): Observable<MovieApi> {
    return this.httpClient.get<MovieApi>(`${this.apiUrl}/${id}`)
  }
  createMovie(movie: MovieResponse): Observable<MovieApi> {
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
  deleteMovie(movieId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/movies/${movieId}`);
  }
}
