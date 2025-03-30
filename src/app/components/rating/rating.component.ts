import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  @Input({ required: true })
  id: string = '';
  // request by product id to get rating
  numberOfRatings = 14;
  rating = {
    star1: 3,
    star2: 1,
    star3: 2,
    star4: 4,
    star5: 4,
  };
  get avg() {
    let res = 0;
    res =
      (this.rating.star1 * 1 +
        this.rating.star2 * 2 +
        this.rating.star3 * 3 +
        this.rating.star4 * 4 +
        this.rating.star5 * 5) /
      this.numberOfRatings;
    res = Math.floor(res);
    let stars = new Array<string>();
    for (let i = 0; i < res; i++) {
      stars.push('icons/star.png');
    }
    for (let i = 0; i < 5 - res; i++) {
      stars.push('icons/starG.png');
    }
    return stars;
  }
}
