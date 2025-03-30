import { Component, Input, OnInit } from '@angular/core';
import { SubcategoryService } from '../../services/subcategory.service';
import { TCategory } from '../../types/TCategory';
import { TSubcategory } from '../../types/TSubcategory';
@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
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
