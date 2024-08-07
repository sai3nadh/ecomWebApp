// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  // { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'registration', component: RegistrationComponent },
  // { path: 'landing-page', component: LandingPageComponent },
  // { path: 'product/:id', component: ProductDetailComponent },
  // { path: 'cart', component: CartComponent },
  // { path: 'checkout', component: CheckoutComponent },
  // { path: '**', redirectTo: '/login' } // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
