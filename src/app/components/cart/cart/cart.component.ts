import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';
import { Component, Input, input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  @Input() productsArray: {
    productImage: string;
    productName: string;
    productPrice: number;
    quantity: number;
    shipping: 'free' | number;
  }[] = [];
  increaseValue(index: number) {
    this.productsArray[index].quantity++;
  }

  decreaseValue(index: number) {
    if (this.productsArray[index].quantity > 1) {
      this.productsArray[index].quantity--;
    }
  }
  get totalPrice(): number {
    return this.productsArray.reduce(
      (total, product) => total + product.productPrice * product.quantity,
      0
    );
  }
  get totalShipping(): number {
    return this.productsArray.reduce(
      (total, product) =>
        total +
        (product.shipping == 'free'
          ? (product.shipping = 0)
          : product.shipping),
      0
    );
  }
  // calculateTotalPrice(){
  //  this.productsArray.reduce
  // }
}
