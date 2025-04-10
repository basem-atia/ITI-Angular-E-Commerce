import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { CategoryService } from '../../services/category.service';
import { TCategory } from '../../types/TCategory';
import { ResetFilterService } from '../../services/reset-filter.service';
import { StorageKeys } from '../../constant';
import { FormsModule } from '@angular/forms';
import { BehaviourSubjectService } from '../../services/behaviour-subject.service';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, LogoComponent, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  hide: boolean = false;
  isUser: boolean = false;
  categories: { data: TCategory[] } = { data: [] };
  selectedCategory!: TCategory;
  searchText: string = '';
  user: any = '';
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private reset: ResetFilterService,
    private behaviourSubject: BehaviourSubjectService
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
    behaviourSubject.keyexists.subscribe((status) => {
      this.isUser = status;
      if (status) {
        this.user = JSON.parse(localStorage.getItem(StorageKeys.LUser)!);
      }
    });
    // this.isUser = localStorage.getItem(StorageKeys.LToken) ? true : false;
    // this.user =
    //   JSON.parse(localStorage.getItem(StorageKeys.LUser) || '{"default":""}') ||
    //   '';
  }
  onSelectCategory = (category: TCategory) => {
    this.selectedCategory = category;
  };
  onChangeSearch = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.searchText = target.value;
  };
  logout() {
    this.behaviourSubject.logOut();
    this.router.navigate(['./login']);
  }
  onSubmitSearch(e: Event) {
    this.reset.resetFilter();
    sessionStorage.setItem(StorageKeys.SSearchText, this.searchText);
    e.preventDefault();
    this.searchText = '';

    this.router.navigateByUrl(`category/${this.selectedCategory._id}`, {
      state: {
        categoryId: this.selectedCategory._id,
        categoryName: this.selectedCategory.name,
      },
    });
  }
  goToAcount = () => {
    this.router.navigateByUrl('/account');
  };
}
