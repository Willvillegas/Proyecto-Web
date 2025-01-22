import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getMovies(): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`${this.url}/movies`);
  }

}
