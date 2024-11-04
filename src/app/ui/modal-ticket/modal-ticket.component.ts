import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-ticket',
  standalone: true,
  imports: [],
  templateUrl: './modal-ticket.component.html',
  styleUrls: ['./modal-ticket.component.css'],
})
export class ModalTicketComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  onCloseModal() {
    this.closeModalEvent.emit();
  }
}
