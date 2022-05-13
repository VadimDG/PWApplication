import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transfers-history',
  templateUrl: './transfers-history.component.html',
  styleUrls: ['./transfers-history.component.scss']
})
export class TransfersHistoryComponent implements OnInit {

  public dataSource = [];
  public displayedColumns: string[] = ['id', 'date', 'username', 'amount', 'balance'];
  
  constructor(private readonly transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsService.listTransactions().subscribe(x => this.dataSource = x.trans_token.map(y => ({
      id: y.id,
      date: y.date,
      username: y.username,
      amount: y.amount,
      balance: y.balance
    })) as any);
  }

}
