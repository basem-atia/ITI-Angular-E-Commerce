import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TProduct } from '../../types/TProduct';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true })
  product!: TProduct;
  price!: number;
  oldPrice!: number;
  isNew: boolean = false;
  badge = 'discount';
  constructor(private router: Router) {}
  ngOnInit() {
    this.price =
      this.product.price - this.product.price * (this.product.discount / 100);
    this.oldPrice = this.product.price;
    const createdDate = new Date(this.product.createdAt);
    const date = new Date();
    this.isNew =
      createdDate.getFullYear() == date.getFullYear() &&
      createdDate.getMonth() == date.getMonth() &&
      createdDate.getUTCDate() == date.getUTCDate();
  }
  goToProduct = () => {
    this.router.navigateByUrl(`product/${this.product._id}`, {
      state: { productId: this.product._id },
    });
  };
}
