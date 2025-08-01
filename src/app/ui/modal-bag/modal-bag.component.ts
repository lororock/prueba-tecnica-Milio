import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBag, addToBag, removeFromBag, BagItem, clearBag } from '../../store/app.store';
import { map, combineLatest, take } from 'rxjs';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'modal-bag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-bag.component.html',
  styleUrls: ['./modal-bag.component.css'],
})
export class ModalBagComponent {
  @Output() openModalEvent = new EventEmitter<number>();
  @Output() closeModalEvent = new EventEmitter<void>();

  public showDetails: boolean = false;

  private store = inject(Store);
  constructor(){
    // close modal when bag becomes empty
    this.bag$.subscribe(bag=>{
      if(bag.length===0){
        this.onCloseModal();
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast: any) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "Bolsa sin productos"
        });
      }
    });
  }

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
    this.total$.pipe(take(1)).subscribe(total => {
      this.openModalEvent.emit(total);
      this.store.dispatch(clearBag());
      this.onCloseModal();
    });
  }
}
