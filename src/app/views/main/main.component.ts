import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@/app/ui/navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, NavbarComponent ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  
}