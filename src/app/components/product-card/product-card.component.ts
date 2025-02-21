import { Component, Input } from '@angular/core';
import { SwitchImgDirective } from '../../directives/switch-img.directive';
import { CurrencyPipe } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';
@Component({
  selector: 'app-product-card',
  imports: [SwitchImgDirective, CurrencyPipe, RatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true })
  productImg: string = '';
  @Input({ required: true })
  badge: 'discount' | 'none' | 'new' = 'none';
  @Input({ required: true })
  productName = 'HAVIT HV-G92 Gamepad';
  @Input()
  discount = '-30';
  @Input({ required: true })
  price = '120';
  @Input()
  oldPrice = '160';
  iconHeart = 'icons/heart.png';
  iconHeartRed = 'icons/heartR.png';
  iconEye = 'icons/eye.png';
}
