import { Component, Output,EventEmitter, Input } from '@angular/core';
import { Product } from '@/app/core/models/product.model';

@Component({
  selector: 'pop-ups-description',
  standalone: true,
  imports: [],
  templateUrl: './pop-ups-description.component.html',
  styleUrls: ['./pop-ups-description.component.css'],
})
export class PopUpsDescriptionComponent {
  @Input() product!: Product | null;
  @Output() closeModalEvent = new EventEmitter<void>();

  onCloseModal() {
    this.closeModalEvent.emit();
  }
}
