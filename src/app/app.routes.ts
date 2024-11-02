import { Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { UserComponent } from './views/user/user.component'; 

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'user', component: UserComponent }
];