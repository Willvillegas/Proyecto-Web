import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from '../interfaces/actor.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  private url = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getActors(): Observable<Actor[]> {
    return this.httpClient.get<Actor[]>(`${this.url}/actors`);
  }

  // Método para buscar actores por nombre 
  searchActors(query: string): Observable<Actor[]> {
    return this.httpClient.get<Actor[]>(`${this.url}/actors?q=${query}`);
  }
}
