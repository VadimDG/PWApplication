import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MainErrorNotifierService } from 'src/app/services/main-error-notifier.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public hide: boolean = true;
  public hide2: boolean = true;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly mainErrorNotifierService: MainErrorNotifierService
  ) {
    this.registerForm = new FormGroup({
      "userName": new FormControl("", [Validators.required]),
      "userEmail": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [Validators.required]),
      "password2": new FormControl("", [Validators.required])
    }, {
      validators: [this.passwordsMatch()],
      updateOn: 'blur',
    });
  }

  ngOnInit(): void {
  }

  public passwordsMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password1 = control.get('password')?.value;
      const password2 = control.get('password2')?.value;

      if (password1 && password2 && password1.trim() && password2.trim() && password1.trim() === password2.trim()) {
        return null;
      }
      return { error: 'Passwords mismatch' };
    };
  }

  submit(): void {

    if (this.registerForm.valid) {
      try {
        this.userService.register(
          this.registerForm.controls['userName'].value,
          this.registerForm.controls['userEmail'].value,
          this.registerForm.controls['password'].value
        ).pipe(
          catchError(error => {
            if (error.error.message.length && error.error.message[0]) {
              this.mainErrorNotifierService.setMainErrorMessage(error.error.message[0]);
            }
            return of(error);
          })).subscribe(_ => {
            this.router.navigateByUrl('/');
          });
      }
      catch (err) {
        console.log(err);
      }

      return;
    }
  }
  redirectToLogin(): void {
    this.router.navigateByUrl('/register');
  }

}
