import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Add this
import { StorageService } from '../services/storage.service';  // Adjust the path as necessary
import { NavbarComponent } from '../navbar/navbar.component'; // Correct path to NavbarComponent
import { RouterModule, Router } from '@angular/router';
import { LandingPageService } from './landing-page.service';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  products: Product[];
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule ,NavbarComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']  // Corrected styleUrls
})
export class LandingPageComponent implements OnInit {
  categoryData: any[] = [];
  errorMessage: string = '';

  constructor(private landingPageService: LandingPageService) {}

  ngOnInit(): void {
    this.landingPageService.fetchCategoryData().subscribe(
      (data) => {
        this.categoryData = data.filter(item => item !== null); // Filter out any null values
        console.log('All categories have been fetched:', this.categoryData);
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching category data. Please try again.';
        console.error('Error fetching category data:', error);
      }
    );
  }
}

