import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainErrorNotifierService } from 'src/app/services/main-error-notifier.service';

@Component({
  selector: 'app-main-error-notifier',
  templateUrl: './main-error-notifier.component.html',
  styleUrls: ['./main-error-notifier.component.scss']
})
export class MainErrorNotifierComponent implements OnInit {

  public errorText$: Observable<string> = this.mainErrorNotifierService.getErrorText();

  constructor(private readonly mainErrorNotifierService: MainErrorNotifierService) { }

  ngOnInit(): void {
  }

  public closeMainErrorPanel(): void {
    this.mainErrorNotifierService.hide();
  }
}
