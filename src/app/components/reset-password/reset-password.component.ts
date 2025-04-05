import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  constructor(
    private authservice: AuthService,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {}
  resetPasswordForm = new FormGroup(
    {
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
    },
    { validators: this.passwordMatch }
  );
  passwordMatch(Formgroup: AbstractControl) {
    const password = Formgroup.get('newPassword')?.value;
    const repassword = Formgroup.get('confirmPassword')?.value;
    return password === repassword ? null : { passwordsMismatch: true };
  }
  get isMatched() {
    const password = this.resetPasswordForm.get('newPassword')?.value;
    const repassword = this.resetPasswordForm.get('confirmPassword')?.value;
    return password === repassword ? true : false;
  }
  get checkValid(): boolean {
    if (this.resetPasswordForm.valid) {
      return true;
    } else {
      return false;
    }
  }
  changePassword() {
    if (this.resetPasswordForm.valid) {
      const newPass = this.resetPasswordForm.get('newPassword')?.value;
      const resetToken = this.getResetTokenFromUrl();
      if (resetToken && newPass) {
        this.authservice.resetPasswordWithEmail(newPass, resetToken).subscribe(
          (res) => {
            this.toaster.success(res.message);
            this.resetPasswordForm.patchValue({
              newPassword: '',
              confirmPassword: '',
            });
          },
          (err) => {
            this.toaster.error(`${err.error.error}`);
          }
        );
      } else {
        this.toaster.warning(`invalid reset token`);
      }
    }
  }
  getResetTokenFromUrl(): string | null {
    const params = this.route.snapshot.paramMap.get('resetToken');
    return params;
  }
}
