import { BASE_PATH } from '../utils/constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
    private readonly USER_LOGIN_PATH = '/sessions/create';
    private readonly USER_REGISTRATION_PATH = '/sessions/create';

    constructor(private readonly http: HttpClient) { }

    public getToken(email: string, password: string): Observable<ITokenResponse> {
        return this.http.post<ITokenResponse>(`${BASE_PATH}${this.USER_LOGIN_PATH}`, {email, password});
    }

    public register(name: string, email: string, password: string): Observable<ITokenResponse> {
      return this.http.post<ITokenResponse>(`${BASE_PATH}${this.USER_REGISTRATION_PATH}`, {name, email, password });
  }
}