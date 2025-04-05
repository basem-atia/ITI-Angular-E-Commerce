import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { TOrder } from '../../types/TOrder';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders-summary',
  imports: [CommonModule],
  templateUrl: './orders-summary.component.html',
  styleUrl: './orders-summary.component.css',
})
export class OrdersSummaryComponent implements OnInit {
  orders: TOrder[] | null = null;
  constructor(
    private ordersService: OrdersService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(
      (res) => {
        this.orders = res.orders;
      },
      (err) => {
        this.toaster.error(err.error.message);
      }
    );
    // this.orders = {
    //   _id: '60b8d1f8f3b1f35d7f3acfd1',
    //   userId: 'user123',
    //   items: [
    //     { name: 'T-Shirt', quantity: 2, price: 19.99 },
    //     { name: 'Jeans', quantity: 1, price: 49.99 },
    //     { name: 'Sneakers', quantity: 1, price: 79.99 },
    //   ],
    //   totalAmount: 169.96,
    //   payment: [
    //     {
    //       _id: '60b8d1f8f3b1f35d7f3acfd2',
    //       amount: 169.96,
    //       createdAt: new Date('2025-04-05T14:30:00Z'),
    //       status: 'succeeded',
    //       paymentIntentId: 'pi_1Hk6O1IyNax1t9cOedYFbqhl',
    //       currency: 'usd',
    //     },
    //   ],
    //   shippingInfo: {
    //     address: '123 Elm St.',
    //     city: 'Cairo',
    //     country: 'Egypt',
    //   },
    //   createdAt: new Date('2025-04-05T14:00:00Z'),
    //   orderStatus: 'succeeded',
    // };
  }
}
