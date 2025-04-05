import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  quantity: number = 1;
  selectedSize: string = 'M';
  product: any;
  products: { productId: string; count: number }[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const productID = history.state.productId;
    this.http.get(`http://localhost:3000/api/product/${productID}`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.product = res.data; // ✅ Extract the "data" field
      },
      error: (err) => console.error('Error fetching product:', err),
    });

    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  addToCart() {
    if (!this.product) return;

    const item = { productId: this.product._id, count: this.quantity };

    const existing = this.products.find((p) => p.productId === item.productId);
    if (existing) {
      existing.count += this.quantity;
    } else {
      this.products.push(item);
    }

    localStorage.setItem('products', JSON.stringify(this.products));

    this.router.navigateByUrl(`cart`);
    console.log('Updated products array saved to localStorage:', this.products);
  }
}
