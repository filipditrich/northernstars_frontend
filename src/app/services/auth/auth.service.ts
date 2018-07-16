import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthModel } from './user-auth.model';
import { ApiRoutes } from '../../config/endpoints';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private httpClient: HttpClient) { }

  authenticateUser(user: UserAuthModel): Observable<any> {
    return this.httpClient.post<UserAuthModel>(ApiRoutes.login, user, httpOptions);
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  loggedIn() {
    this.loadToken();
    return this.authToken ? !new JwtHelperService().isTokenExpired(this.authToken) : false;
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  sendRegistrationRequest(request): Observable<any> {
    return this.httpClient.post(ApiRoutes.requestRegistration, request, httpOptions);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
