import { ProfileButtonComponent } from '@/app/shared/profile-button/profile-button.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ProfileButtonComponent, RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

}
