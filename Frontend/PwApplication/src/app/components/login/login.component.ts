import { MainErrorNotifierService } from './../../services/main-error-notifier.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { setLocalStorageValueByKey } from 'src/app/utils/services';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public hide: boolean = true;

  constructor(
    private readonly userService: UserService, 
    private readonly router: Router
  ) {
    this.loginForm = new FormGroup({
      "userEmail": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  isSubmitButtonDisabled(): boolean | null {
    return this.loginForm.valid ? null : true;
  }

  submit(): void {
    if (this.loginForm.valid) {

      this.userService.getToken(this.loginForm.controls['userEmail'].value, this.loginForm.controls['password'].value)
        .subscribe({
          next: token => {
            if (token) {
              setLocalStorageValueByKey('token', token.access_token);
              setLocalStorageValueByKey('loggedinUser', this.loginForm.controls['userEmail'].value);
              this.router.navigateByUrl('/');
            }
          },
          error: err => console.log(err)
        });
      return;
    }
  }

  redirectToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
