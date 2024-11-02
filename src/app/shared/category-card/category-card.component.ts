import { Component, Input } from '@angular/core';

@Component({
  selector: 'category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
export class CategoryCardComponent {
  @Input() icon = '';
  @Input() text = '';
}
