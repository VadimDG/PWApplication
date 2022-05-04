import { BASE_PATH } from '../utils/constants';
import { first, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly USER_LOGIN_PATH = '/sessions/create';
  private readonly USER_REGISTRATION_PATH = '/users';

  constructor(private readonly http: HttpClient) { }

  public getToken(email: string, password: string): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(`${BASE_PATH}${this.USER_LOGIN_PATH}`, { email, password });
  }

  public register(name: string, email: string, password: string): Observable<ITokenResponse> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    const body = { name, email, password };
    return this.http.post<ITokenResponse>(`${BASE_PATH}${this.USER_REGISTRATION_PATH}`, body, { headers }).pipe(first());
  }
}