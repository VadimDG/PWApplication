import { BASE_PATH } from '../utils/constants';
import { first, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransactionToken } from '../models/ITransaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {

  private readonly LIST_TRANSACTIONS_PATH = '/api/protected/transactions';

  constructor(private readonly http: HttpClient) { }

  public listTransactions(): Observable<ITransactionToken> {
    return this.http.get<ITransactionToken>(`${BASE_PATH}${this.LIST_TRANSACTIONS_PATH}`).pipe(first());
  }
}