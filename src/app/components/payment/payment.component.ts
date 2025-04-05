// src/app/payment/payment.component.ts
import { Component, OnInit } from '@angular/core';
// import { StripeService } from './../../services/stripe.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  imports: [CommonModule],
})
export class PaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  cardElement: any;
  clientSecret: string = '';
  paymentError: string = '';
  isProcessing: boolean = false;

  // constructor(private stripeService: StripeService) {}
  constructor(private activatedroute: ActivatedRoute, private route: Router) {}
  async ngOnInit() {
    // this.stripe = await this.stripeService.stripePromise;
    // this.elements = this.stripe.elements();
    this.activatedroute.queryParams.subscribe((params) => {
      this.clientSecret = params['clientSecret'];
    });

    const cardStyle = {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': { color: '#aab7c4' },
        },
        invalid: { color: '#fa755a', iconColor: '#fa755a' },
      },
    };
    loadStripe(
      'pk_test_51RABcbPJfCeQUsQq4duJWzAwsIrAUhxU3BDnJvCTuyMitaHDQhls0KEES55CEfO9dEpjBWvcmR4yy7kccJmtmyFa00OHGCtr3W'
    ).then((stripee) => {
      this.stripe = stripee;
      const elements = stripee!.elements();
      this.cardElement = elements.create('card', cardStyle)!;
      this.cardElement.mount('#card-element');
    });
  }

  handlePayment() {
    this.isProcessing = true;
    this.stripe
      ?.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.cardElement,
        },
      })
      .then((result: any) => {
        if (
          result.paymentIntent &&
          result.paymentIntent.status === 'succeeded'
        ) {
          alert('Payment Successful!');
          this.route.navigate(['ordersSummary']);
          this.isProcessing = false;
        } else {
          alert('Payment Failed: ' + result.error.message);
        }
      });
  }
}
