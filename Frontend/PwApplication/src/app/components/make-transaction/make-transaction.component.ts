import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, pipe, tap } from 'rxjs';
import { TransferService } from 'src/app/services/transefer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss']
})
export class MakeTransactionComponent implements OnInit {

  @ViewChild('userautocomplete') userAutocomplete!: ElementRef;

  public users$: Observable<any[]>;
  public amount: string = '';
  public userObj: any = {};

  constructor(private readonly userService: UserService, private readonly transferService: TransferService) { 
    this.users$ = userService.getUsers().pipe(tap(console.log));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    fromEvent(this.userAutocomplete.nativeElement, 'input')
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      map((event: any) => (<HTMLInputElement>event.target).value)
      ).subscribe(x => {
        this.users$ = this.userService.getUsers(x)
      });
  }

  public makeTransfer(): void {
    if (this.userObj.id && +this.amount > 0) {
      this.transferService.makeTransfer(this.userObj.id, +this.amount).subscribe(_ => console.log('success'));
    }
    else {
      console.error('transaction input parameters are incorrect');
    }
  }

  public displayFn(item: any): string {
    return item ? item.username : '';
  }
}
