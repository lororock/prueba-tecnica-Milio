import { Component, Input } from '@angular/core';

@Component({
  selector: 'profile-button',
  standalone: true,
  imports: [],
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.css']
})
export class ProfileButtonComponent{
 @Input() icon = '';
 @Input() text = '';

}
