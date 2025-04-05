import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acount',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './acount.component.html',
  styleUrl: './acount.component.css',
})
export class AcountComponent implements OnInit {
  username: string = '';
  emailphone: string = '';
  passwordChangeSuccess = '';
  constructor(
    private authservice: AuthService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    let user: { username: string; emailphone: string } = {
      username: '',
      emailphone: '',
    };
    this.authservice.getUser().subscribe(
      (res) => {
        this.username = res.user.username;
        this.emailphone = res.user.emailphone;
        this.myform.patchValue({
          name: this.username,
          emailphone: this.emailphone,
        });
      },
      (err) => console.log(err.message)
    );
  }

  myform = new FormGroup(
    {
      name: new FormControl(this.username, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      emailphone: new FormControl(this.emailphone, [
        Validators.required,
        Validators.pattern(
          '^(\\+?[0-9]{11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$'
        ),
      ]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
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
  ); //it call passwordMatch every time for typing in confirm or new password and if null validations succeed and
  //if returned object then it is not valid regardless what is in this object
  passwordMatch(Formgroup: AbstractControl) {
    const password = Formgroup.get('newPassword')?.value;
    const repassword = Formgroup.get('confirmPassword')?.value;
    return password === repassword ? null : { passwordsMismatch: true };
  }
  get isMatched() {
    const password = this.myform.get('newPassword')?.value;
    const repassword = this.myform.get('confirmPassword')?.value;
    return password === repassword ? true : false;
  }
  changePassword() {
    if (this.myform.valid) {
      const newPass = this.myform.get('newPassword')?.value;
      const oldPass = this.myform.get('password')?.value;
      const username = this.myform.get('name')?.value;
      const emailphone = this.myform.get('emailphone')?.value;
      const address = this.myform.get('address')?.value;
      this.authservice
        .changePassword(
          oldPass || '',
          newPass || '',
          username || '',
          emailphone || '',
          address || ''
        )
        .subscribe(
          (res) => {
            this.toaster.success('Welcome');

            this.myform.patchValue({
              password: '',
              newPassword: '',
              confirmPassword: '',
            });
          },
          (err) => {
            this.toaster.warning(`${err.error.error}`);
          }
        );
    }
  }
  get checkValid(): boolean {
    if (this.myform.valid) {
      return true;
    } else {
      return false;
    }
  }
  empty() {
    this.myform.patchValue({
      password: '',
      newPassword: '',
      confirmPassword: '',
    });
  }
}
// Kamal@12
