import { ProfileButtonComponent } from '@/app/shared/profile-button/profile-button.component';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserDetails } from '@/app/core/models/user.model';
import { UserService } from '@/app/core/services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ProfileButtonComponent, RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userData: UserDetails | undefined;

  constructor(private readonly userService: UserService) {}
  async ngOnInit(): Promise<void> {
    await this.loadUser();
  }

  private readonly loadUser = async () => {
    this.userData = await this.userService.getUserProfile();
  };
}
