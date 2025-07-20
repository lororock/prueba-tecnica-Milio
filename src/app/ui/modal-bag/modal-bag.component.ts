import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBag, addToBag, removeFromBag, BagItem } from '../../store/app.store';
import { map, combineLatest } from 'rxjs';

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
  productsCount$ = this.bag$.pipe(map((bag) => bag.reduce((acc, item) => acc + item.quantity, 0)));
  subtotal$ = this.bag$.pipe(map((bag) => bag.reduce((acc, item) => acc + item.product.price * item.quantity, 0)));
  tax$ = this.subtotal$.pipe(map((sub) => +(sub * 0.19).toFixed(2)));
  total$ = combineLatest([this.subtotal$, this.tax$]).pipe(map(([sub, tax]) => sub + tax));

  toggleDetails() {
    this.showDetails = !this.showDetails
  }

  addItem(item: BagItem) {
    this.store.dispatch(addToBag(item.product, item.size));
  }

  removeItem(item: BagItem) {
    this.store.dispatch(removeFromBag(item.product.id, item.size));
  }


  onCloseModal() {
    this.closeModalEvent.emit();
  }
  onOpenModal() {
    this.openModalEvent.emit();
    this.onCloseModal();
  }
}
