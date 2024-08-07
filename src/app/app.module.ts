// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
// import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LandingPageComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    NavbarComponent
    // Declare other components here as needed
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Import RouterModule and configure routes
    FormsModule, // Import FormsModule
 
    AppRoutingModule, // Import the routing module here
    // Import other modules like FormsModule, HttpClientModule if needed
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
