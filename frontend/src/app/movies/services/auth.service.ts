import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiUrl: string = environment.apiUrl
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  /**
   * Login a new user
   * @param username string
   * @param password string
   * @returns  Observable<string> generated token for the user
   */
  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this._apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((token: string) => {
          this.setToken(token);
        })
      );
  }

  /**
   * Register a new user
   * @param user UserInterface
   * @returns Observable<UserInterface> returns the user created
   */
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this._apiUrl}/auth/register`, user);
  }

  /**
   *  Set the token in the local storage
   * @param token  string
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   *  Get the token from the local storage
   * @returns string | null
   */
  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Logout the user
   */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!AuthService.getToken();
  }
}
