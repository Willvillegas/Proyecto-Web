import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getMovies(): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`${this.url}/movies`);
  }

  // Método para buscar películas
  searchMovies(query: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.url}/movies?q=${query}`);
  }

  // Obtener una película por su ID
  getMovieById(movieId: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.url}/movies/${movieId}`);
  }

  // Agregar una nueva película
  addMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(`${this.url}/movies`, movie);
  }

  // Actualizar una película existente
  updateMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.put<Movie>(`${this.url}/movies/${movie.id}`, movie);
  }

  // Eliminar una película por su ID
  deleteMovie(movieId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/movies/${movieId}`);
  }
  

}
