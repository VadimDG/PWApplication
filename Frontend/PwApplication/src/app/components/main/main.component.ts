import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { getLocalStorageValueByKey } from 'src/app/utils/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public userName: string = '';
  public balance: number = 0;
  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {

    this.userService.getLoggedUserInfo().subscribe(x => {
      this.userName = x.name;
      this.balance = x.balance;
    });
  }

}
