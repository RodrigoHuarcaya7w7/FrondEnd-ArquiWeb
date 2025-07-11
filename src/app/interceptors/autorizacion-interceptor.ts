import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../services/user-service';
import { Observable } from 'rxjs';

export const autorizacionInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService);

  let token = userService.getTokenActual();
  if (token && token!="") {
    let clonRequest = req.clone({
      headers: req.headers.set("Authorization","Bearer "+token)
    });
    return next(clonRequest);
  }
  return next(req);
};


