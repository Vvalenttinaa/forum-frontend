import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject} from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageDialogService } from '../services/message-dialog.service';

export const AuthInterceptorService: HttpInterceptorFn = (req, next) => {
  
  let localToken = null;

  if (typeof window !== 'undefined' && window.sessionStorage) {
    localToken = sessionStorage.getItem("token");
  }

  if (localToken) {
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localToken) });
  }
  return next(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        if(event.status === 401){
          inject(MessageDialogService).showMessageDialog("Error", "You are not enabled to access!");
          inject(Router).navigate(["/login"]);
        }
        if(event.status === 400){
          inject(AuthService).logout();
          inject(MessageDialogService).showMessageDialog("Error","Wrong request!");
          inject(Router).navigate(["/login"]);
        }
      }
  }));
};
