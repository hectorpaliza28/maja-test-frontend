import { AuthService } from '../services/auth.service';
import {inject} from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if(token){
    const clonRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(clonRequest);
  }

  return next(req);
}

