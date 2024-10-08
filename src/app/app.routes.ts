import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'landing-page', component: LandingPageComponent },
  // { path: 'product/:id', component: ProductDetailComponent },
  { path: 'product/:productId', component: ProductDetailComponent },  // Change 'id' to 'productId'

  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component:CartComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'profile/orders', component: OrdersComponent },
  { path: 'profile/view', component: ProfileComponent },
  { path: '**', redirectTo: '/login' }
  // { path: '**', redirectTo: '/landing-page' }
  // this imp. its redirecting the pages
];
