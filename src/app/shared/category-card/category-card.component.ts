import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
export class CategoryCardComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() selected: boolean = false;
  @Output() select = new EventEmitter<void>();

  handleClick(){
    this.select.emit();
  }
}
