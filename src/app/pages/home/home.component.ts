import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Router } from '@angular/router';
import { TCategory } from '../../types/TCategory';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  categories!: { data: TCategory[] };
  constructor(
    private categoryServices: CategoryService,
    private router: Router
  ) {
    categoryServices.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
    });
  }
  goToCategory = (categoryId: string, categoryName: string) => {
    this.router.navigateByUrl(`category/${categoryId}`, {
      state: { categoryId, categoryName },
    });
  };
}
