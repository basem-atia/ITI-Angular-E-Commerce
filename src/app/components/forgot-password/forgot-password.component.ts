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
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(\\+?[0-9]{10,}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$'
      ),
    ]),
  });
  constructor(
    private authservice: AuthService,
    private toaster: ToastrService,
    private route: Router
  ) {}
  submit(email: string) {
    if (this.forgetPasswordForm.valid) {
      this.authservice.forgetPassword(email).subscribe(
        (res) => {
          if (/^\+?[0-9]{10,}$/.test(email)) {
            this.route.navigate(['/resetPasswordPhone']);
          }
          this.toaster.success('Check out your Gmail ');
        },
        (err) => {
          console.log(err);

          this.toaster.error(err.error.message);
        }
      );
    }
  }
}
