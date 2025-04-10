import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoryComponent } from './pages/category/category.component';
import { AcountComponent } from './components/acount/acount.component';
import { ContactComponent } from './components/contact/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'account', component: AcountComponent },
  { path: 'contact', component: ContactComponent },
];
