import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acount',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './acount.component.html',
  styleUrl: './acount.component.css',
})
export class AcountComponent implements OnInit {
  currentUser: any;
  accountForm: FormGroup = new FormGroup({});
  serverMessage: string = '';
  isSuccess: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.currentUser = this.authService.getUser();
    console.log('Current User Data:', this.currentUser);

    if (this.currentUser) {
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.accountForm = new FormGroup({
      name: new FormControl(this.currentUser?.name || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      emailPhone: new FormControl(this.currentUser?.emailPhone || '', [
        Validators.required,
        Validators.pattern(
          '^(\\+?[0-9]{11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$'
        ),
      ]),
      address: new FormControl(this.currentUser?.address || ''),
      currentPassword: new FormControl(''),
      newPassword: new FormControl('', [
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
      confirmPassword: new FormControl(''),
    });
  }

  updateProfile(): void {
    if (this.accountForm.valid) {
      const updatedData = this.accountForm.value;

      if (updatedData.currentPassword !== this.currentUser?.password) {
        this.serverMessage = 'Current password is incorrect.';
        this.isSuccess = false;
        return;
      }
      if (updatedData.newPassword !== updatedData.confirmPassword) {
        this.serverMessage = 'New password and confirm password do not match.';
        this.isSuccess = false;
        return;
      }
      this.authService.updateUser(updatedData).subscribe({
        next: (response) => {
          this.serverMessage = 'Profile updated successfully!';
          this.isSuccess = true;
          this.loadUserData();
        },
        error: (error) => {
          this.serverMessage = 'Error updating profile. Please try again.';
          this.isSuccess = false;
        },
      });
    } else {
      this.serverMessage = 'Please fill in all required fields correctly.';
      this.isSuccess = false;
    }
  }

  cancel(): void {
    this.accountForm.reset(this.currentUser);
  }
}
