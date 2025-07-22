import { Component, Output,EventEmitter, Input, OnInit, inject } from '@angular/core';
import { Product } from '@/app/core/models/product.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToBag, selectBag } from '../../store/app.store';
import  Swal  from 'sweetalert2';
import { ModalService } from '@/app/core/services/modal.service';

@Component({
  selector: 'modal-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-description.component.html',
  styleUrls: ['./modal-description.component.css'],
})
export class ModalDescriptionComponent implements OnInit {
  @Input() product!: Product | null;
  @Output() closeModalEvent = new EventEmitter<void>();

  private store = inject(Store);
  private modalSvc = inject(ModalService);

  selectedSize: string | null = null;

  ngOnInit(): void {
    if (this.product) {
      this.selectedSize = this.product.tallas?.[0] ?? null;
    }
    // Log the current bag content every time it changes
    this.store.select(selectBag).subscribe((bag) => {
      console.log('Productos en la bolsa:', bag);
    });
  }

  addToBag(): void {
    if (this.product && this.selectedSize) {
      this.store.dispatch(addToBag(this.product, this.selectedSize));
      this.onCloseModal();
      // open bag modal
      this.modalSvc.triggerOpenModalBag();
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
        icon: "success",
        title: "Producto agregado a la bolsa"
      });
    }
  }

  selectSize(talla: string) {
    this.selectedSize = talla;
  }

  onCloseModal() {
    this.closeModalEvent.emit();
  }
}
