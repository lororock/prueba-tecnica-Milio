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

  public details: boolean = false;

  showDetails() {
    this.details = true;
  }
  hiddenDetails() {
    this.details = false;
  }

  onCloseModal() {
    this.closeModalEvent.emit();
  }
  onOpenModal() {
    this.openModalEvent.emit();
    this.onCloseModal();
  }
}
