import { Injectable } from '@angular/core';
import { StorageKeys } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class ResetFilterService {
  constructor() {}
  resetFilter = () => {
    sessionStorage.removeItem(StorageKeys.SFilterSubCategoryId);
    sessionStorage.removeItem(StorageKeys.Spage);
    sessionStorage.removeItem(StorageKeys.shippingIsFree);
    sessionStorage.removeItem(StorageKeys.SHasDiscount);
    sessionStorage.removeItem(StorageKeys.SUserPrice);
  };
}
