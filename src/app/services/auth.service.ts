import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import LoginRequest from '../model/requests/LoginRequest';
import LoginResponse from '../model/responses/LoginResponse';
import { apiEndpoint } from '../constants/constants';
import RegistrationRequest from '../model/requests/RegistrationRequest';
import User from '../model/User';
import AccountActivationRequest from '../model/requests/AccountActivationRequest';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, request).pipe(
      tap((res: LoginResponse) => {
        if (this.checkLocalStorage()) {
          localStorage.setItem('token', res.token.toString());
        }
      })
    );
  }

  register(req: RegistrationRequest): Observable<User> {
    return this.http.post<User>(`${apiEndpoint.AuthEndpoint.register}`, req).pipe(
      tap((user: User) => {
        if (this.checkLocalStorage()) {
          localStorage.setItem('userId', user.id.toString());
        //  this.authStatusSubject.next(true);
        }
      })
    );
  }

  activate(req: AccountActivationRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${apiEndpoint.AuthEndpoint.sendReactivation}`, req).pipe(
      tap((res:LoginResponse)=>{
        if(this.checkLocalStorage()){
          localStorage.setItem('userId', res.user.id.toString());
          localStorage.setItem('token', res.token.toString());
        }
      })
    );
  }

  logout(){
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  }

  private checkLocalStorage(): boolean {
    return typeof localStorage !== 'undefined';
  }

  decodeToken(): any {
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      return jwt_decode.jwtDecode(token);
    }
  }

  getRole() {
    const roleMatch = this.decodeToken().role.match(/name=([a-zA-Z]+)/);
    return roleMatch ? roleMatch[1] : null;
  }

  isLoggedIn(){
    if(sessionStorage.getItem('token') && sessionStorage.getItem('userId')){
      return true;
    }
    return false;
  }
}
