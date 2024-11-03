import { Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { UserComponent } from './views/user/user.component'; 
import { HomeComponent } from './views/home/home.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'categories', component: CategoriesComponent },
    //se puede agregar mas rutas que requieran las barras de navegacion
  ]},
  { path: '**', component: NotFoundComponent }

];