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
  }

}
