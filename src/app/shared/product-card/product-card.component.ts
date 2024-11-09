import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@/app/core/models/product.model';
@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  like: boolean = false

  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() img: string = '';
  @Input() product!: Product;

  @Output() openModalEvent = new EventEmitter<Product>();

  addFav(){
    this.like = !this.like
  }

  handleClick() {
    this.openModalEvent.emit(this.product);
  }

}
