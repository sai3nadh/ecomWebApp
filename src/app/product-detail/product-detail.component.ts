import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; // Correct path to NavbarComponent
import {  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';  // Import FormsModule to use ngModel
import { SearchResultsService } from '../search-results/search-results.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent],

  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  productDetailService: any;
  product: any;
  constructor(private router: ActivatedRoute,// Router,
  private searchService: SearchResultsService  // Inject the service

) { }
  ngOnInit(): void {
    alert('cale in ngonit');
    const productId = this.router.snapshot.paramMap.get('id');
    this.productDetailService.getProductById(Number(productId)).subscribe(
      (data: any) => {
        this.product = data;
        alert(data+"wdfwdw");
        console.log('Product details:', this.product);
      },
      (error: any) => {
        alert(error);

        console.error('Error fetching product details:', error);
      }
    );
    // throw new Error('Method not implemented.');
  }

}
