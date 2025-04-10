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
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  register() {
    if (this.myForm.valid) {
      var user = {
        name: this.myForm.value.name,
        password: this.myForm.value.password,
        email: '',
        phone: '',
      };
      if (
        this.myForm.value.emailPhone?.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )
      ) {
        user.email = this.myForm.value.emailPhone;
      }
      if (this.myForm.value.emailPhone?.match(/^\+?[0-9]{11}$/)) {
        user.phone = this.myForm.value.emailPhone;
      }
      this.authService.register(user).subscribe({
        next: (res) => {
          if (res.message === 'Already exists, Please log in...') {
            this.toaster.error('User already exists!');
          } else if (
            res &&
            res.message !== 'Already exists, Please log in...'
          ) {
            this.toaster.success('Registration successful!');
            setTimeout(() => this.router.navigate(['/login']), 2000);
          }
        },
        error: (err) => {
          console.log(err.error);
          this.toaster.error('Registration failed. Please try again.');
        },
      });
    } else {
      this.toaster.warning('Please fill out the form correctly.');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
