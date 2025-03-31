import { Component, Input } from '@angular/core';
import { SubcategoryService } from '../../services/subcategory.service';
import { TCategory } from '../../types/TCategory';
import { TSubcategory } from '../../types/TSubcategory';

@Component({
  selector: 'app-mobile-side-bar',
  imports: [],
  templateUrl: './mobile-side-bar.component.html',
  styleUrl: './mobile-side-bar.component.css',
})
export class MobileSideBarComponent {
  @Input({ required: true })
  category!: TCategory;
  subCategories!: { data: TSubcategory[] };

  constructor(private subcategoryService: SubcategoryService) {}

  ngOnInit() {
    this.subcategoryService.getAllByCategoryId(this.category._id).subscribe({
      next: (data) => (this.subCategories = data),
    });
  }
}
