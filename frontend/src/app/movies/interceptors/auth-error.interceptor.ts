import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.log('Unauthorized');
      } else if (error.status === 403) {
        console.log('Forbidden');
      }

      return throwError(() => error);
    })
  );
};
