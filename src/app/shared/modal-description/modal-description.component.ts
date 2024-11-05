import { Component, Output,EventEmitter, Input } from '@angular/core';
import { Product } from '@/app/core/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-description.component.html',
  styleUrls: ['./modal-description.component.css'],
})
export class ModalDescriptionComponent {
  @Input() product!: Product | null;
  @Output() closeModalEvent = new EventEmitter<void>();

  onCloseModal() {
    this.closeModalEvent.emit();
  }
}
