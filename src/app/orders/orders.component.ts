import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from './orders.service';
import { StorageService } from '../services/storage.service';
import { NavbarComponent } from '../navbar/navbar.component'; // Correct path to NavbarComponent
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';  // Import FormsModule to use ngModel
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})

export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    const userId = Number(this.storageService.getLocalVariable('userId'));
    this.orderService.getOrdersByUserId(userId).subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        console.log('Orders:', this.orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
