import { BASE_PATH } from '../utils/constants';
import { first, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokenResponse } from '../models/token-response';
import { IUserInfo } from '../models/IUserInfo';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly USER_LOGIN_PATH = '/sessions/create';
  private readonly USER_REGISTRATION_PATH = '/users';
  private readonly USER_FILTERED_LIST = '/api/protected/users/list';
  private readonly LOGGED_USER_INFO = '/api/protected/user-info';

  constructor(private readonly http: HttpClient) { }

  public getToken(email: string, password: string): Observable<ITokenResponse> {
    const body = { username: email, password };
    return this.http.post<ITokenResponse>(`${BASE_PATH}${this.USER_LOGIN_PATH}`, body);
  }

  public register(name: string, email: string, password: string): Observable<ITokenResponse> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    const body = { name, email, password };
    return this.http.post<ITokenResponse>(`${BASE_PATH}${this.USER_REGISTRATION_PATH}`, body, { headers }).pipe(first());
  }

  public getLoggedUserInfo(): Observable<IUserInfo> {
    return this.http.get<IUserInfo>(`${BASE_PATH}${this.LOGGED_USER_INFO}`).pipe(first());
  }

  public getUsers(filter: string = ''): Observable<any> {
    const body = { filter };
    return this.http.post<string>(`${BASE_PATH}${this.USER_FILTERED_LIST}`, body).pipe(first());
  }
}