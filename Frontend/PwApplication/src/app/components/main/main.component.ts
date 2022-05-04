import { Component, OnInit } from '@angular/core';
import { getLocalStorageValueByKey } from 'src/app/utils/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public userName: string = '';
  
  constructor() { }

  ngOnInit(): void {
    const loggedinUser = getLocalStorageValueByKey('loggedinUser');
    if (loggedinUser) {
      this.userName = loggedinUser;
    }
  }

}
