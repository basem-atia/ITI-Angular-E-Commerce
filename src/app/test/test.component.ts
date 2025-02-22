import { Component } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';

@Component({
  selector: 'app-test',
  imports: [HomeComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {}
