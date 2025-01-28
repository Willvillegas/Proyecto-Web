import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { MovieApi, MovieResponse } from '../interfaces/movieApi.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  getMovieById(id: string): Observable<MovieApi> {
    return this.httpClient.get<MovieApi>(`${this.apiUrl}/${id}`)
  }
  createMovie(movie: MovieResponse): Observable<MovieApi> {
    return this.httpClient.post<MovieApi>(`${this.apiUrl}`, movie);
  }
}
