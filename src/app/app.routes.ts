import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoryComponent } from './pages/category/category.component';
import { AcountComponent } from './pages/acount/acount.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FAQComponent } from './components/faq/faq/faq.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ResetPasswordPhoneComponent } from './pages/reset-password-phone/reset-password-phone.component';
import { OrdersSummaryComponent } from './components/orders-summary/orders-summary.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'account', component: AcountComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'cart', component: CartComponent },
  { path: 'forgetPassword', component: ForgotPasswordComponent },
  { path: 'checkout', component: CheckOutComponent },
  {
    path: 'resetPasswordWithEmail/:resetToken',
    component: ResetPasswordComponent,
  },

  { path: 'payment', component: PaymentComponent },
  { path: 'resetPasswordPhone', component: ResetPasswordPhoneComponent },
  { path: 'ordersSummary', component: OrdersSummaryComponent },

  { path: '**', component: NotFoundComponent, title: 'Error 404' },
];
