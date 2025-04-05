import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StripeService } from '../../services/stripe.service';
import { Router } from '@angular/router';
import { TPaymentPayLoad } from '../../types/TPaymentPayLoad';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-out',
  standalone: true,
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CheckOutComponent implements OnInit {
  checkout: FormGroup;
  orderItems: any[] = [];
  totalPrice: number = 0;
  totalShipping: number = 0;
  subtotal: number = 0;

  constructor(
    private _FormBuilder: FormBuilder,
    private stripeservice: StripeService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.checkout = this._FormBuilder.group({
      address: ['', [Validators.required]],
      phone: [
        '',
        [Validators.pattern('^(\\+?[0-9]{11})$'), Validators.required],
      ],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      payment: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const storedItems = localStorage.getItem('productsArray');
    const shipping = localStorage.getItem('totalShipping');
    const totalPrice = localStorage.getItem('finalTotal');
    if (storedItems && shipping) {
      this.orderItems = JSON.parse(storedItems);
      this.totalShipping = +shipping;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.subtotal = this.orderItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    this.totalPrice = this.subtotal + this.totalShipping;
  }

  handelForm(): void {
    const payment = this.checkout.get('payment')?.value;
    console.log(payment);

    const payload: TPaymentPayLoad = {
      data: {
        address: this.checkout.get('address')?.value,
        city: this.checkout.get('city')?.value,
        country: this.checkout.get('country')?.value,
      },
      totalPrice: this.totalPrice,
      orderItems: this.orderItems,
      method: payment,
    };
    this.stripeservice.pay(payload).subscribe(
      (res) => {
        if (res.cash.trim() === 'true') {
          this.router.navigate(['ordersSummary']);
        } else {
          const clientSecret = res.client_secret;
          this.router.navigate(['payment'], { queryParams: { clientSecret } });
        }
        this.toaster.success('done successfully');
      },
      (err) => {
        this.toaster.error(err);
      }
    );
  }
}
