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
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  login() {
    if (this.myForm.valid) {
      const user = {
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

      this.authService.login(user).subscribe({
        next: (res) => {
          if (res && res.token) {
            this.authService.saveToken(res.token);
            if (res.user) {
              this.authService.saveUser(res.user);
            }
            this.toaster.success('Login successful!');
            setTimeout(() => this.router.navigate(['/']), 2000);
          } else {
            this.toaster.error('Login failed. Please try again.');
          }
        },
        error: () => {
          this.toaster.error(
            'Invalid email/phone or password.'
          );
        },
      });
    } else {
      this.toaster.warning('Please fill out the form correctly.');
    }
  }
}
