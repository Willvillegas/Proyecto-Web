import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
