import { Component } from '@angular/core';
import { ProductCardComponent } from '../components/product-card/product-card.component';

@Component({
  selector: 'app-test',
  imports: [ProductCardComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {}
