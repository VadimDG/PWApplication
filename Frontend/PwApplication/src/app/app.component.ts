import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MainErrorNotifierService } from './services/main-error-notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isMainErrorNotifierVisible$: Observable<boolean>;

  constructor(private readonly mainErrorNotifierService: MainErrorNotifierService) {
    this.isMainErrorNotifierVisible$ = mainErrorNotifierService.getVisibleState();
    
  }
  ngOnInit(): void {
    this.mainErrorNotifierService.hide();
  }
}
