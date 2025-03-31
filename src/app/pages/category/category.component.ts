import { Component } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { TCategory } from '../../types/TCategory';
import { ProductService } from '../../services/product.service';
import { TProduct } from '../../types/TProduct';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MobileSideBarComponent } from '../../components/mobile-side-bar/mobile-side-bar.component';

@Component({
  selector: 'app-category',
  imports: [
    SideBarComponent,
    ProductCardComponent,
    LoaderComponent,
    MobileSideBarComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  category: TCategory = {
    _id: history.state.categoryId,
    name: history.state.categoryName,
  };
  numberOfPages: number = 10;
  pages = new Array(4).fill(0, 0, this.numberOfPages);

  products!: { data: TProduct[] };
  constructor(private producService: ProductService) {}

  ngOnInit() {
    this.producService.getAllByCategoryId(this.category._id).subscribe({
      next: (data) => (this.products = data),
    });
  }
}
