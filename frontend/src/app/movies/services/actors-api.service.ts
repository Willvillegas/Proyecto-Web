import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ActorApi, ActorResponse } from '../interfaces/actorApi.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ActorsApiService {
  private apiUrl = `${environment.apiUrl}/actors`;
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllActors(): Observable<ActorResponse> {
    return this.httpClient.get<ActorResponse>(`${this.apiUrl}`);
  }
  getActorById(id: string): Observable<ActorApi> {
    return this.httpClient.get<ActorApi>(`${this.apiUrl}/${id}`)
  }
  createActor(actor: ActorApi): Observable<ActorApi> {
    return this.httpClient.post<ActorApi>(`${this.apiUrl}`, actor);
  }

  getActors(limit?: number): Observable<ActorApi[]> {
    let query = new HttpParams();
    if (limit) {
      query = query.set('limit', limit.toString());
    }

    return this.httpClient.get<ActorResponse>(`${this.apiUrl}`, { params: query })
      .pipe(
        map(response => response.data) // Extrae solo la lista de actores
      );
  }

  // Método para buscar actores por nombre 
  searchActors(query: string, limit?: number): Observable<ActorApi[]> {
    const params = new HttpParams().set('search', query);

    if (limit) params.set('limit', limit.toString());

    return this.httpClient
      .get<{ data: ActorApi[] }>(`${this.apiUrl}`, { params: params })
      .pipe(map(response => response.data));
  }

  // Método para obtener actores con paginación
  getActorsPage(limit: number, offset: number): Observable<ActorResponse> {
    return this.httpClient.get<ActorResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  updateActor(actor: ActorApi): Observable<ActorApi> {
    return this.httpClient.put<ActorApi>(`${this.apiUrl}/${actor._id}`, actor);
  }

  // Eliminar un actor por su ID
  deleteActor(id: string): Observable<ActorApi> {
    return this.httpClient.delete<ActorApi>(`${this.apiUrl}/${id}`);
  }


}
