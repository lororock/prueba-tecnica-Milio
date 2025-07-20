import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBag } from '../../store/app.store';
import { map } from 'rxjs';

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

  private store = inject(Store);

  bag$ = this.store.select(selectBag);
  productsCount$ = this.bag$.pipe(map((bag) => bag.length));
  subtotal$ = this.bag$.pipe(map((bag) => bag.reduce((acc, item) => acc + item.price, 0)));
  total$ = this.subtotal$.pipe(map((sub) => sub + 24));

  toggleDetails() {
    this.showDetails = !this.showDetails
  }


  onCloseModal() {
    this.closeModalEvent.emit();
  }
  onOpenModal() {
    this.openModalEvent.emit();
    this.onCloseModal();
  }
}
