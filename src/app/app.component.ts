import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router'; // Import RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Angular App';
}


// import { Component, OnInit } from '@angular/core';
// import { Router, RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent implements OnInit{
//   title = 'ecommerce-app';
//   constructor(private router: Router) {}

//   ngOnInit() {
//     console.log('Configured Routes:', this.router.config);
//   }

// }

