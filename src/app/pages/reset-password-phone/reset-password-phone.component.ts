import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password-phone',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password-phone.component.html',
  styleUrl: './reset-password-phone.component.css',
})
export class ResetPasswordPhoneComponent {
  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private rot: Router
  ) {}
  resetPasswordForm = new FormGroup(
    {
      code: new FormControl('', [Validators.required]),
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
      const code = this.resetPasswordForm.get('code')?.value;
      const newPass = this.resetPasswordForm.get('newPassword')?.value;
      if (code && newPass) {
        this.authservice.resetPasswordWithPhone(newPass, code).subscribe(
          (res) => {
            this.toaster.success(res.message);
            this.resetPasswordForm.patchValue({
              newPassword: '',
              confirmPassword: '',
            });
            this.rot.navigate(['/home']);
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
}
