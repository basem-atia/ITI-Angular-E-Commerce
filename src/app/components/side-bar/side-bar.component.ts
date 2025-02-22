import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  tabs = [
    'Electronics',
    'Home & Lifestyle',
    'Medicine',
    'Sports & Outdoor',
    "Baby's & Toys",
    'Groceries & Pets',
    'Health & Beauty',
  ];
}
