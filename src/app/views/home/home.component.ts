import { Component } from '@angular/core';
import { KeywordSearchComponent } from '@/app/shared/keyword-search/keyword-search.component';
import { CategoryCardComponent } from '@/app/shared/category-card/category-card.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KeywordSearchComponent, CategoryCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  categories = [
    { id: 1, icon: '👟', text: 'Ropa' },
    { id: 2, icon: '⚽', text: 'Deporte' },
    { id: 3, icon: '🎮', text: 'Juegos' },
    { id: 4, icon: '🎁', text: 'Regalos' },
    { id: 5, icon: '🧳', text: 'Maletas' },
    { id: 6, icon: '🎄', text: 'Navidad' },
    { id: 7, icon: '👓', text: 'Gafas' },
  ];
}
