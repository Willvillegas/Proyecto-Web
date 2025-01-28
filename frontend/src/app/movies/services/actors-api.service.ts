import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorsApiService {
  private apiUrl = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  getActors(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/actors`);
  }
}
