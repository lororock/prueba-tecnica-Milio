import { Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { UserComponent } from './views/user/user.component'; 
import { NotFoundComponent } from './views/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'user', component: UserComponent },
  { path: '**', component: NotFoundComponent }

];