import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';
import { TProduct } from '../../types/TProduct';
@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true })
  product!: TProduct;
  price!: number;
  oldPrice!: number;
  badge = 'discount';
  ngOnInit() {
    this.price =
      this.product.price - this.product.price * (this.product.discount / 100);
    this.oldPrice = this.product.price;
  }
}
