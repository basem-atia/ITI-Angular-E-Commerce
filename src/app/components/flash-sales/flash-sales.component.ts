import { Component } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-flash-sales',
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './flash-sales.component.html',
  styleUrl: './flash-sales.component.css',
})
export class FlashSalesComponent {}
