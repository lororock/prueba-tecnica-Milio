import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-bag',
  standalone: true,
  imports: [],
  templateUrl: './modal-bag.component.html',
  styleUrls: ['./modal-bag.component.css']
})
export class ModalBagComponent {
  @Output() openModalEvent = new EventEmitter<void>();
  @Output() closeModalEvent = new EventEmitter<void>();


  onCloseModal() {
    this.closeModalEvent.emit();
  }
  onOpenModal() {
    this.openModalEvent.emit();
    this.onCloseModal()
  }
}
