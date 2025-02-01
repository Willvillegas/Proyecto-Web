import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/userApi.interfaces';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient, private router: Router) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, user);
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { username, password })
    .pipe(
      tap((user: User) => {
        this.setUser(user);
      })
    );
  }

  getUserDetails(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  private setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getUser(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!UserApiService.getUser();
  }
}