import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private readonly router: Router, private readonly userService: UserService) {
    this.registerForm = new FormGroup({
      "userName": new FormControl("", [ Validators.required ]),
      "userEmail": new FormControl("", [ Validators.required, Validators.email ]),
      "password": new FormControl("", [ Validators.required]),
      "password2": new FormControl("", [ Validators.required ])
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

      if (password1.trip() && password2.trip() && password1.trip() === password2.trip()) {
        return null;
      }
      return  { error: 'Passwords mismatch'};
    };
  }

  submit(): void {
    if (this.registerForm.valid) {
      
      this.userService.register(
        this.registerForm.controls['userName'].value, 
        this.registerForm.controls['userEmail'].value,
        this.registerForm.controls['password'].value
        ).subscribe(response => {
          console.log(response)  // TODO check if response is successful
      });
      return;
    }
  }
  redirectToLogin(): void {
    this.router.navigateByUrl('/register');
  }
  
}
