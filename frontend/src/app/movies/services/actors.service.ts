import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from '../interfaces/actor.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  private url = environment.apiUrl;

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

  addActor(actor: Actor): Observable<Actor> {
    return this.httpClient.post<Actor>(`${this.url}/actors`, actor);
  }

  // Actualizar un actor existente
  updateActor(actor: Actor): Observable<Actor> {
    return this.httpClient.put<Actor>(`${this.url}/actors/${actor.id}`, actor);
  }

  // Eliminar un actor por su ID
  deleteActor(actorId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/actors/${actorId}`);
  }
}
