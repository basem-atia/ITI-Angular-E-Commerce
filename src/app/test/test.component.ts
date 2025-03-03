import { Component } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { WishlistComponent } from '../pages/wishlist/wishlist.component';

@Component({
  selector: 'app-test',
  imports: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WishlistComponent,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {}
