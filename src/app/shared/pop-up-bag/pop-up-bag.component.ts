import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pop-up-bag',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-bag.component.html',
  styleUrls: ['./pop-up-bag.component.css']
})
export class PopUpBagComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  onCloseModal() {
    this.closeModalEvent.emit();
  }
}
