import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserApiService } from '../../users/services/userApi.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const userApiService = inject(UserApiService);
  const user = UserApiService.getUser();
  let newRequest = req;

  if (user) {
    newRequest = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${user.username}`)
    });
  }

  return next(newRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error: ', error);
      return throwError(() => error);
    })
  );
};