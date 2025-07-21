import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal-ticket',
  standalone: true,
  imports: [],
  templateUrl: './modal-ticket.component.html',
  styleUrls: ['./modal-ticket.component.css'],
})
export class ModalTicketComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() total: number = 0;

  onCloseModal() {
    this.closeModalEvent.emit();
  }
}
