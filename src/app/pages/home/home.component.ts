import { Component } from '@angular/core';
import { AdvertisementComponent } from '../../components/advertisement/advertisement.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { CategoriesComponent } from '../../components/categories/categories/categories.component';
import { FlashSalesComponent } from '../../components/flash-sales/flash-sales.component';

@Component({
  selector: 'app-home',
  imports: [
    AdvertisementComponent,
    SideBarComponent,
    CategoriesComponent,
    FlashSalesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
