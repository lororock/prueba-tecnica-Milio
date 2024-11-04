import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() img: string = '';

  @Output() openModalEvent = new EventEmitter<void>();

  onOpenModal() {
    this.openModalEvent.emit();
  }

}
