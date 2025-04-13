import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';
import { Component, Input, input, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TProductCart } from '../../../types/TProductCart';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}
  // @Input() productsArray: {
  //   productImage: string;
  //   productName: string;
  //   productPrice: number;
  //   quantity: number;
  //   shipping: 'free' | number;
  // }[] = [
  //   {
  //     productName: 'GamePad1',
  //     productImage:
  //       'https://i.ibb.co/TBrQJgqV/d6cedd7c8b1073685c5f1be1b50e1ac6.png',
  //     productPrice: 220,
  //     quantity: 1,
  //     shipping: 'free',
  //   },
  //   {
  //     productName: 'tv1',
  //     productImage: 'https://i.ibb.co/jkKYpYq1/tv.png',
  //     productPrice: 210,
  //     quantity: 1,
  //     shipping: 5,
  //   },
  //   {
  //     productName: 'GamePad2',
  //     productImage:
  //       'https://i.ibb.co/8DPT1dL8/2722dbdf98f25179d3c0b785988c513d.png',
  //     productPrice: 200,
  //     quantity: 1,
  //     shipping: 10,
  //   },
  //   {
  //     productName: 'tv2',
  //     productImage:
  //       'https://i.ibb.co/5xMTHLBY/8cc24eeff489863523b63971c3ff8e4a.png',
  //     productPrice: 190,
  //     quantity: 1,
  //     shipping: 'free',
  //   },
  //   {
  //     productName: 'tv2',
  //     productImage:
  //       'https://i.ibb.co/ycXBRMyZ/65fe639fccc1fe4168fca740ef1f85e7.png',
  //     productPrice: 180,
  //     quantity: 1,
  //     shipping: 'free',
  //   },
  //   {
  //     productName: 'GamePad1',
  //     productImage:
  //       'https://i.ibb.co/TBrQJgqV/d6cedd7c8b1073685c5f1be1b50e1ac6.png',
  //     productPrice: 220,
  //     quantity: 1,
  //     shipping: 20,
  //   },
  // ];
  productsArray: TProductCart[] = [];
  ngOnInit(): void {
    // this.authservice.getProductsById().subscribe(
    //   (res) => {
    //     this.productsArray = res.data;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    this.authservice.getProductsById().subscribe(
      (res) => {
        if (res?.data) {
          this.productsArray = res.data;
          const prodArray = this.authservice.getProductsFromStorage();
          prodArray.forEach((pair) => {
            this.productsArray.forEach((product, i) => {
              if (pair.productsId === product._id) {
                product.quantity = +pair.count;
                product.totalPrice = this.calculateSubtotal(product);
              }
            });
          });
          this.toaster.success('Success');
        }
      },
      (err) => {
        this.toaster.error('Error Happend');
      }
    );

    // if (data) {
    //   this.productsArray = data;
    // }
  }
  calculateSubtotal(product: TProductCart) {
    let discountAmount =
      (product.discount * product.price * product.quantity!) / 100;
    return (
      Math.round((product.quantity! * product.price - discountAmount) * 100) /
      100
    );
  }
  increaseValue(index: number) {
    this.productsArray[index].quantity!++;
    this.productsArray[index].totalPrice = this.calculateSubtotal(
      this.productsArray[index]
    );
  }

  decreaseValue(index: number) {
    if (this.productsArray[index].quantity! > 1) {
      this.productsArray[index].quantity!--;
      this.productsArray[index].totalPrice = this.calculateSubtotal(
        this.productsArray[index]
      );
    }
  }
  getSubtotal(product: TProductCart): number {
    let discountAmount =
      (product.discount * product.price * product.quantity!) / 100;
    return (
      Math.round((product.quantity! * product.price - discountAmount) * 100) /
      100
    );
    // return (
    //   Math.round(
    //     (product.quantity! * product.price -
    //       (product.discount * product.price * product.quantity!) / 100) *
    //       100
    //   ) / 100
    // );
  }
  get totalPrice(): number {
    return this.productsArray.reduce(
      (total, product) =>
        total +
        Math.round(
          (product.price * product.quantity! -
            (product.discount * product.price * product.quantity!) / 100) *
            100
        ) /
          100,
      0
    );
  }
  get totalShipping(): number {
    return this.productsArray.reduce(
      (total, product) =>
        total +
        Math.round(
          (product.shipping == 0 ? (product.shipping = 0) : product.shipping!) *
            100
        ) /
          100,
      0
    );
  }
  canceled(i: any) {
    const id = this.productsArray[i]._id;
    this.productsArray.splice(i, 1);
    let products: { productsId: string; count: number }[] = JSON.parse(
      localStorage['products']
    );
    products = products.filter((elem) => elem.productsId != id);
    localStorage['products'] = JSON.stringify(products);
  }
  sub() {
    localStorage['productsArray'] = JSON.stringify(this.productsArray);
    localStorage['totalShipping'] = JSON.stringify(this.totalShipping);
    localStorage['finalTotal'] = JSON.stringify(
      this.totalShipping == 0
        ? this.totalPrice
        : this.totalPrice + this.totalShipping
    );
    this.router.navigate(['/checkout']);
  }
}
