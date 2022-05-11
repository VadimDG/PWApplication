import { BASE_PATH } from '../utils/constants';
import { first, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private readonly MAKE_TRANSACTION_PATH = '/api/protected/transactions';
  private readonly LIST_TRANSACTIONS_PATH = '/api/protected/users/list';

  constructor(private readonly http: HttpClient) { }

  public makeTransfer(userId: number, amount: number): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(`${BASE_PATH}${this.MAKE_TRANSACTION_PATH}`, { userId, amount }).pipe(first());
  }

  public listTransactions(name: string, email: string, password: string): Observable<ITokenResponse> {
    const body = { name, email, password };
    return this.http.post<ITokenResponse>(`${BASE_PATH}${this.LIST_TRANSACTIONS_PATH}`, body).pipe(first());
  }
}