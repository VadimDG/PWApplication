import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainErrorNotifierService } from 'src/app/services/main-error-notifier.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isMainErrorNotifierVisible$: Observable<boolean>;
  public userName: string = '';
  public balance: number = 0;
  constructor(
    private readonly userService: UserService, 
    private readonly router: Router,
    private readonly mainErrorNotifierService: MainErrorNotifierService,
    private readonly socketService: SocketService
  ) {
    this.isMainErrorNotifierVisible$ = mainErrorNotifierService.getVisibleState();
  }

  ngOnInit(): void {
    this.mainErrorNotifierService.hide();
    this.userService.getLoggedUserInfo().subscribe(x => {
      this.socketService.identifySocket(x.id);
      this.userName = x.username;
      this.balance = x.balance;
    });
    this.socketService.socket$.subscribe(x => this.balance = x);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedinUser');
    
    this.router.navigate(['login']);
  }

}
