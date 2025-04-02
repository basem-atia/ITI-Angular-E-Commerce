import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  myForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
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

  //register function
  register() {
    if (this.myForm.valid) {
      this.authService.register(this.myForm.value).subscribe({
        next: (res) => {
          if ((res.message = 'Already exists, Please log in...')) {
            this.serverMessage = 'User already exists!';
            this.isSuccess = false;
          } else if (
            res &&
            res.message !== 'Already exists, Please log in...'
          ) {
            this.serverMessage = 'Registration successful!';
            this.isSuccess = true;
            setTimeout(() => this.router.navigate(['/login']), 2000);
          }
        },
        error: (err) => {
          this.serverMessage = 'Registration failed. Please try again.';
          this.isSuccess = false;
        },
      });
    } else {
      this.serverMessage = 'Please fill out the form correctly.';
      this.isSuccess = false;
    }
  }
}
