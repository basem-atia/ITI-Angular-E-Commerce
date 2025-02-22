import { Component, Input } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-flash-sales',
  imports: [TitleComponent, ProductCardComponent],
  templateUrl: './flash-sales.component.html',
  styleUrl: './flash-sales.component.css',
})
export class FlashSalesComponent {
  @Input({ required: true })
  products: any;
  @Input({ required: true })
  time: number = 0;
  intervalTime?: ReturnType<typeof setInterval>;
  intervalProduct?: ReturnType<typeof setInterval>;
  labels = ['Days', 'Hours', 'Minutes', 'Seconds'];
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  margin: number = 0;
  ngOnInit() {
    this.intervalTime = setInterval(() => {
      if (this.time <= 0) clearInterval(this.intervalTime);
      this.days = Math.floor(this.time / (24 * 60 * 60));
      let modTime = this.time % (24 * 60 * 60);
      this.hours = Math.floor(modTime / (60 * 60));
      modTime = modTime % (60 * 60);
      this.minutes = Math.floor(modTime / 60);
      modTime = modTime % 60;
      this.seconds = modTime;
      this.time--;
    }, 1000);
    this.intervalProduct = setInterval(() => {
      this.onNext();
    }, 3000);
  }
  onNext = () => {
    let product = this.products.shift();
    this.products.push(product);
  };
  onPrev = () => {
    let product = this.products.pop();
    this.products.unshift(product);
  };
  onMouseOverNP = () => {
    clearInterval(this.intervalProduct);
  };
  onMouseOutNP = () => {
    this.intervalProduct = setInterval(() => {
      this.onNext();
    }, 3000);
  };
}
