import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  formSubmitted: boolean = false;

  myForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
      Validators.minLength(3),
    ]),
    emailPhone: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(\\+?[0-9]{11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$'
      ),
    ]),

    message: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private toaster: ToastrService
  ) {}

  submitForm() {
    this.formSubmitted = true;
    const user = this.authService.getUser();
    const formData = this.myForm.value;

    if (formData.name !== user.name || formData.emailPhone !== user.email) {
      this.toaster.error(
        'Your form details do not match your logged-in user details.'
      );
      this.formSubmitted = false;
      return;
    }

    if (this.myForm.valid) {
      this.authService.submitContactForm(formData).subscribe({
        next: (res) => {
          this.myForm.reset();
          this.formSubmitted = false;
          this.toaster.success(
            'Your message was successfully submitted!'
          );
        },
        error: (err) => {
          this.formSubmitted = false;
          console.log('Form submission failed', err);
          this.toaster.error(
            'There was an issue with your submission. Please try again.'
          );
        },
      });
    }
  }
}
