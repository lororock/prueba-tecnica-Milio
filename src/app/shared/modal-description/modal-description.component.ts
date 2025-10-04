import { Component, Output,EventEmitter, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { Product } from '@/app/core/models/product.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToBag, selectBag } from '../../store/app.store';
import  Swal  from 'sweetalert2';
import { ModalService } from '@/app/core/services/modal.service';
import { FavoriteService } from '@/app/core/services/favorite.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'modal-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-description.component.html',
  styleUrls: ['./modal-description.component.css'],
})
export class ModalDescriptionComponent implements OnInit, OnDestroy {
  @Input() product!: Product | null;
  @Output() closeModalEvent = new EventEmitter<void>();

  private store = inject(Store);
  private modalSvc = inject(ModalService);
  private favoriteService = inject(FavoriteService);
  private subscription?: Subscription;

  selectedSize: string | null = null;
  like: boolean = false;

  ngOnInit(): void {
    if (this.product) {
      this.selectedSize = this.product.tallas?.[0] ?? null;
      // Set initial favorite state
      this.like = this.favoriteService.isFavorite(this.product.id);
    }
    
    // Subscribe to favorites changes
    this.subscription = this.favoriteService.favorites$.subscribe(favorites => {
      if (this.product) {
        this.like = favorites.has(this.product.id);
      }
    });
    
    // Log the current bag content every time it changes
    this.store.select(selectBag).subscribe((bag) => {
      console.log('Productos en la bolsa:', bag);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

  addFav(): void {
    if (this.product) {
      this.favoriteService.toggleFavorite(this.product.id);
    }
  }

  onCloseModal() {
    this.closeModalEvent.emit();
  }
}
