import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { catchError, tap, throwError } from 'rxjs';
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = AuthService.getToken();
  let newRequest = req;
  if (token) {
    newRequest = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`)
    });
  }


  return next(newRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('error: ', error);
      return throwError(() => error);
    })
  );
};
