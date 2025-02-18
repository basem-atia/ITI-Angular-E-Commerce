import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';

@Component({
  selector: 'app-root',
  imports: [CategoriesComponent, TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Project';
}
