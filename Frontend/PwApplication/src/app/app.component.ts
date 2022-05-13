import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MainErrorNotifierService } from './services/main-error-notifier.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
