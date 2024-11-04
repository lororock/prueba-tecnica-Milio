import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@/app/core/models/product.model';

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
  @Input() product!: Product;

  @Output() openModalEvent = new EventEmitter<Product>();

  handleClick() {
    this.openModalEvent.emit(this.product);
  }

}
