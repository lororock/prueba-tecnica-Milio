import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@/app/ui/navbar/navbar.component';
import { NavbarMobileComponent } from '@/app/ui/navbar-mobile/navbar-mobile.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, NavbarComponent, NavbarMobileComponent ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  
}