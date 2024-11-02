import { ProfileButtonComponent } from '@/app/shared/profile-button/profile-button.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ProfileButtonComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

}
