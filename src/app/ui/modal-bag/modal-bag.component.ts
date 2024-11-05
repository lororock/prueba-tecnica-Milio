import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-bag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-bag.component.html',
  styleUrls: ['./modal-bag.component.css'],
})
export class ModalBagComponent {
  @Output() openModalEvent = new EventEmitter<void>();
  @Output() closeModalEvent = new EventEmitter<void>();

  public showDetails: boolean = false;

  toggleDetails() {
    this.showDetails = true;
  }


  onCloseModal() {
    this.closeModalEvent.emit();
  }
  onOpenModal() {
    this.openModalEvent.emit();
    this.onCloseModal();
  }
}
