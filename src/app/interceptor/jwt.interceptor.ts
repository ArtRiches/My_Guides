import { HttpInterceptorFn } from '@angular/common/http';
import { inject} from '@angular/core';
import { JWTRepository } from 'app/repo/jwt.repo';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    if (localStorage.getItem('JWT')) {
      const token =  inject(JWTRepository).getToken();
      const reqWithJWT = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return next(reqWithJWT);
    }
  return next(req);
};
