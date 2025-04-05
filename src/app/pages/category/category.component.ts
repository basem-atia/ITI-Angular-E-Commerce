import { Component } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { TCategory } from '../../types/TCategory';
import { ProductService } from '../../services/product.service';
import { TProduct } from '../../types/TProduct';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MobileSideBarComponent } from '../../components/mobile-side-bar/mobile-side-bar.component';
import { Router } from '@angular/router';
import { TFilter } from '../../types/TFilter';
import { StorageKeys } from '../../constant';
import { ResetFilterService } from '../../services/reset-filter.service';
import { TPrices } from '../../types/TPrices';

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
  pageNumber: number = 1;
  targetPage: number = 1;
  products: TProduct[] = [];
  filter: TFilter = undefined;
  prices!: TPrices;
  constructor(
    private producService: ProductService,
    private router: Router,
    private reset: ResetFilterService
  ) {}

  ngOnInit() {
    this.pageNumber = Number.parseInt(
      sessionStorage.getItem(StorageKeys.Spage) || '1'
    );
    const SFilterSubCategoryId = sessionStorage.getItem(
      StorageKeys.SFilterSubCategoryId
    );
    this.filter = {
      page: Number.parseInt(sessionStorage.getItem(StorageKeys.Spage) || '1'),
      categoryId: this.category._id,
      subCategoryId: SFilterSubCategoryId || '',
      freeShapping:
        sessionStorage.getItem(StorageKeys.shippingIsFree) == 'true',
      hasDiscount:
        sessionStorage.getItem(StorageKeys.SFilterSubCategoryId) == 'true',
      userMaxPrice: Number.parseInt(
        sessionStorage.getItem(StorageKeys.SUserPrice) || '0'
      ),
    };
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    if (this.filter?.subCategoryId == '' && this.filter.freeShapping == false) {
      this.producService
        .getAllByCategoryId(this.category._id, this.pageNumber)
        .subscribe({
          next: (data) => {
            this.products = data.data;
            this.numberOfPages = data.numberOfPages;
            this.prices = data.prices;
          },
        });
    } else {
      this.producService.getByFilter(this.filter).subscribe({
        next: (data) => {
          this.products = data.data;
          this.numberOfPages = data.numberOfPages;
          this.prices = data.prices;
        },
      });
    }
  }
  onClickRadio = (id: string) => {
    this.reset.resetFilter();
    sessionStorage.setItem(StorageKeys.SFilterSubCategoryId, id);
    sessionStorage.setItem(StorageKeys.Spage, '1');
    this.pageNumber = 1;
    this.filter = {
      categoryId: this.category._id,
      subCategoryId: id,
      page: 1,
      freeShapping:
        sessionStorage.getItem(StorageKeys.shippingIsFree) == 'true',
      userMaxPrice: Number.parseInt(
        sessionStorage.getItem(StorageKeys.SUserPrice) || '0'
      ),
      hasDiscount:
        sessionStorage.getItem(StorageKeys.SFilterSubCategoryId) == 'true',
    };
    this.products = [];
    if (id) this.filterProducts(false);
  };
  onClickDiscount = (checked: boolean) => {
    this.products = [];

    this.filterProductsCheck(checked, StorageKeys.SHasDiscount);
  };
  onClickFreeShipping = (checked: boolean) => {
    this.products = [];
    this.filterProductsCheck(checked, StorageKeys.shippingIsFree);
  };
  onClickGoForPrice = (price: number) => {
    sessionStorage.setItem(StorageKeys.SUserPrice, price.toString());
    if (this.filter) this.filter.userMaxPrice = price;
    this.filterProducts(false);
    ///////////////
  };
  onClickPageNumber = (pNum: number) => {
    this.pageNumber = pNum;
    sessionStorage.setItem(StorageKeys.Spage, pNum.toString());
    this.products = [];
    if (this.filter) this.filter.page = pNum;
    this.filterProducts(this.filter?.subCategoryId == '');
  };
  onClickPrevious = () => {
    this.onClickPageNumber(this.pageNumber - 1);
  };
  onClickNext = () => {
    this.onClickPageNumber(this.pageNumber + 1);
  };
  onSubmitSearch = (e: Event) => {
    e.preventDefault();
    this.onClickPageNumber(this.targetPage);
  };
  onChangePageNumber = (e: Event) => {
    let target = e.target as HTMLInputElement;
    this.targetPage = Number.parseInt(target.value);
  };
  filterProducts = (flag: boolean) => {
    this.products = [];

    if (flag) {
      this.producService
        .getAllByCategoryId(
          this.category._id,
          (this.filter && this.filter.page) || 1
        )
        .subscribe({
          next: (data) => {
            this.products = data.data;
            this.numberOfPages = data.numberOfPages;
            this.prices = data.prices;
          },
        });
    } else {
      this.producService.getByFilter(this.filter).subscribe({
        next: (data) => {
          this.products = data.data;
          this.numberOfPages = data.numberOfPages;
          this.prices = data.prices;
        },
      });
    }
  };
  filterProductsCheck = (checked: boolean, keyStorage: string) => {
    this.pageNumber = 1;
    sessionStorage.setItem(keyStorage, checked.toString());
    if (this.filter) {
      this.filter.hasDiscount =
        sessionStorage.getItem(StorageKeys.SHasDiscount) == 'true';
      this.filter.freeShapping =
        sessionStorage.getItem(StorageKeys.shippingIsFree) == 'true';

      this.filter.page = 1;
    }

    this.filterProducts(false);
  };
}
