import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SubcategoryService } from '../../services/subcategory.service';
import { TCategory } from '../../types/TCategory';
import { TSubcategory } from '../../types/TSubcategory';
import { StorageKeys } from '../../constant';
import { FormsModule } from '@angular/forms';
import { TPrices } from '../../types/TPrices';
import { CurrencyPipe } from '@angular/common';
import { ResetFilterService } from '../../services/reset-filter.service';
@Component({
  selector: 'app-side-bar',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  @Input({ required: true })
  isLoading: boolean = true;
  @Input({ required: true })
  category!: TCategory;
  @Input({ required: true })
  prices: TPrices = { min: 0, max: 0 };
  @Output()
  onClickRadio = new EventEmitter();
  @Output()
  onClickFreeShipping = new EventEmitter();
  @Output()
  onClickDiscount = new EventEmitter();
  @Output()
  onClickGoForPrice = new EventEmitter();
  subCategories!: { data: TSubcategory[] };
  selectedSubCategoryId: string =
    sessionStorage.getItem(StorageKeys.SFilterSubCategoryId) || 'all';
  selectedSubCategoryName: string =
    sessionStorage.getItem(StorageKeys.SFilterSubCategoryName) || 'all';
  shippingIsFree: boolean =
    sessionStorage.getItem(StorageKeys.shippingIsFree) == 'true';
  hasDiscount: boolean =
    sessionStorage.getItem(StorageKeys.SHasDiscount) == 'true';

  userPrice: number = Number.parseInt(
    sessionStorage.getItem(StorageKeys.SUserPrice) || '0'
  );
  searchText: string = sessionStorage.getItem(StorageKeys.SSearchText) || '';
  filters = new Array(5);
  submittedprice: number = Number.parseInt(
    sessionStorage.getItem(StorageKeys.SUserPrice) || '0'
  );
  @ViewChild('radioElementRef') radioElementRef!: ElementRef;
  constructor(
    private subcategoryService: SubcategoryService,
    private reset: ResetFilterService
  ) {}

  ngOnInit() {
    this.subcategoryService.getAllByCategoryId(this.category._id).subscribe({
      next: (data) => {
        this.subCategories = data;
        if (
          this.selectedSubCategoryId != 'all' &&
          this.selectedSubCategoryId != ''
        )
          this.selectedSubCategoryName = data.data.filter(
            (s) => s._id == this.selectedSubCategoryId
          )[0].name;
        else this.selectedSubCategoryName = 'all';
      },
    });
  }

  clickRadio(e: Event) {
    const target = e.target as HTMLInputElement;

    this.userPrice = 0;
    this.submittedprice = this.userPrice;
    this.selectedSubCategoryId = target.id;
    if (target.id != 'all' && target.id != '')
      this.selectedSubCategoryName = this.subCategories.data.filter(
        (s) => s._id == target.id
      )[0].name;
    else this.selectedSubCategoryName = 'all';
    this.onClickRadio.emit(target.id);
  }
  clickFreeShipping(e: Event) {
    const target = e.target as HTMLInputElement;
    this.userPrice = 0;
    this.submittedprice = this.userPrice;

    this.onClickFreeShipping.emit(target.checked);
  }
  clickDiscount(e: Event) {
    this.userPrice = 0;
    this.submittedprice = this.userPrice;
    const target = e.target as HTMLInputElement;
    this.onClickDiscount.emit(target.checked);
  }
  clickGoForPrice() {
    this.submittedprice = this.userPrice;
    this.onClickGoForPrice.emit(this.userPrice);
  }
  clickReset() {
    this.reset.resetFilter();
    let radioAll = this.radioElementRef.nativeElement as HTMLInputElement;
    radioAll.checked = true;
    this.shippingIsFree = false;
    this.hasDiscount = false;
    this.userPrice = 0;
    this.submittedprice = this.userPrice;
    this.selectedSubCategoryId = 'all';
    this.onClickRadio.emit(this.selectedSubCategoryId);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.searchText = sessionStorage.getItem(StorageKeys.SSearchText) || '';
  }
  clickDeleteFilter(num: number) {
    // 0-> selectedSubCategoryId 2-> shippingIsFree 1-> hasDiscount 3-> submittedprice 4-> search text
    switch (num) {
      case 0:
        this.userPrice = 0;
        this.submittedprice = this.userPrice;
        this.selectedSubCategoryId = 'all';
        this.onClickRadio.emit(this.selectedSubCategoryId);
        break;
      case 1:
        this.userPrice = 0;
        this.submittedprice = this.userPrice;
        this.hasDiscount = false;
        this.onClickDiscount.emit(false);
        break;
      case 2:
        this.userPrice = 0;
        this.submittedprice = this.userPrice;
        this.shippingIsFree = false;
        this.onClickFreeShipping.emit(false);
        break;
      case 3:
        this.userPrice = 0;
        this.submittedprice = this.userPrice;
        this.onClickRadio.emit(this.selectedSubCategoryId);
        break;
      case 4:
        this.userPrice = 0;
        this.submittedprice = this.userPrice;
        this.searchText = '';
        sessionStorage.removeItem(StorageKeys.SSearchText);
        this.onClickRadio.emit(this.selectedSubCategoryId);
        break;
    }
  }
}
