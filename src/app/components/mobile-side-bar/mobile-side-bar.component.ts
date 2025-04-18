import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SubcategoryService } from '../../services/subcategory.service';
import { TCategory } from '../../types/TCategory';
import { TSubcategory } from '../../types/TSubcategory';
import { StorageKeys } from '../../constant';
import { FormsModule } from '@angular/forms';
import { TPrices } from '../../types/TPrices';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-mobile-side-bar',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './mobile-side-bar.component.html',
  styleUrl: './mobile-side-bar.component.css',
})
export class MobileSideBarComponent {
  show: string = '';
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
  shippingIsFree: boolean =
    sessionStorage.getItem(StorageKeys.shippingIsFree) == 'true';
  hasDiscount: boolean =
    sessionStorage.getItem(StorageKeys.SHasDiscount) == 'true';

  userPrice: number = Number.parseInt(
    sessionStorage.getItem(StorageKeys.SUserPrice) || '0'
  );
  @ViewChild('radioElementRef') radioElementRef!: ElementRef;
  constructor(private subcategoryService: SubcategoryService) {}
  ngOnInit() {
    this.subcategoryService.getAllByCategoryId(this.category._id).subscribe({
      next: (data) => {
        this.subCategories = data;
      },
    });
    this.userPrice = Number.parseInt(
      sessionStorage.getItem(StorageKeys.SUserPrice) || '0'
    );
  }

  clickRadio(e: Event) {
    this.show = 'show';
    const target = e.target as HTMLInputElement;
    this.shippingIsFree = false;
    this.hasDiscount = false;
    this.userPrice = 0;
    this.onClickRadio.emit(target.value);
  }
  clickFreeShipping(e: Event) {
    const target = e.target as HTMLInputElement;
    this.userPrice = 0;
    this.show = 'show';

    this.onClickFreeShipping.emit(target.checked);
  }
  clickDiscount(e: Event) {
    this.show = 'show';
    this.userPrice = 0;
    const target = e.target as HTMLInputElement;
    this.onClickDiscount.emit(target.checked);
  }
  clickGoForPrice() {
    this.show = '';
    this.onClickGoForPrice.emit(this.userPrice);
  }
  clickReset() {
    let radioAll = this.radioElementRef.nativeElement as HTMLInputElement;
    radioAll.checked = true;
    this.show = 'show';

    this.shippingIsFree = false;
    this.hasDiscount = false;
    this.userPrice = 0;
    this.selectedSubCategoryId = 'all';
    this.onClickRadio.emit(this.selectedSubCategoryId);
  }
}
