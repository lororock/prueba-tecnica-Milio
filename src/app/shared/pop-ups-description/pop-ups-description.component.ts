import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'pop-ups-description',
  standalone: true,
  imports: [],
  templateUrl: './pop-ups-description.component.html',
  styleUrls: ['./pop-ups-description.component.css'],
})
export class PopUpsDescriptionComponent {

  @Output() closeModalEvent = new EventEmitter<void>();

  onCloseModal() {
    this.closeModalEvent.emit();
  }
}
