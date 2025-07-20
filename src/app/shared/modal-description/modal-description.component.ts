import { Component, Output,EventEmitter, Input, OnInit, inject } from '@angular/core';
import { Product } from '@/app/core/models/product.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToBag, selectBag } from '../../store/app.store';

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

  ngOnInit(): void {
    // Log the current bag content every time it changes
    this.store.select(selectBag).subscribe((bag) => {
      console.log('Productos en la bolsa:', bag);
    });
  }

  addToBag(): void {
    if (this.product) {
      this.store.dispatch(addToBag(this.product));
    }
  }

  onCloseModal() {
    this.closeModalEvent.emit();
  }
}
