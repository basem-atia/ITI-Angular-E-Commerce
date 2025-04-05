import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { CategoryService } from '../../services/category.service';
import { TCategory } from '../../types/TCategory';
import { ResetFilterService } from '../../services/reset-filter.service';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, LogoComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  hide: boolean = false;
  isUser: boolean = false;
  categories: { data: TCategory[] } = { data: [] };
  selectedCategory!: TCategory;
  searchText: string = '';
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private reset: ResetFilterService
  ) {
    categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.selectedCategory = data.data[0];
      },
    });
    router.events.subscribe((e) => {
      let eventString = e.toString();
      if (eventString.includes('ActivationStart')) {
        this.hide =
          eventString.includes('login') || eventString.includes('signup');
      }
    });
    this.isUser = localStorage.getItem('token') ? true : false;
  }
  onSelectCategory = (category: TCategory) => {
    this.selectedCategory = category;
  };
  onChangeSearch = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.searchText = target.value;
  };
  onSubmitSearch(e: Event) {
    this.reset.resetFilter();
    e.preventDefault();
    if (this.searchText) {
    } else {
      this.router.navigateByUrl(`category/${this.selectedCategory._id}`, {
        state: {
          categoryId: this.selectedCategory._id,
          categoryName: this.selectedCategory.name,
        },
      });
    }
  }
}
