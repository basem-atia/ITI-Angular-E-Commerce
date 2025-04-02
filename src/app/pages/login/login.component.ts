import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  myForm = new FormGroup({
    emailPhone: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(\\+?[0-9]{11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$'
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      ),
    ]),
  });

  serverMessage: string = '';
  isSuccess: boolean = false;

  //inject auth service and router in constructor
  constructor(private authService: AuthService, private router: Router) {}

  //login function
  login() {
    if (this.myForm.valid) {
      this.authService.login(this.myForm.value).subscribe({
        next: (res) => {
          if (res && res.token) {
            this.serverMessage = 'Login successful!';
            this.isSuccess = true;
            this.authService.saveToken(res.token);
            setTimeout(() => this.router.navigate(['/']), 2000);
          } else {
            this.serverMessage = 'Login failed. Please try again.';
            this.isSuccess = false;
          }
        },
        error: (err) => {
          this.serverMessage =
            'Login failed. Please check your email/phone and password.';
          this.isSuccess = false;
        },
      });
    } else {
      this.serverMessage = 'Please fill out the form correctly.';
      this.isSuccess = false;
    }
  }
}
