import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
import { Product } from '@/app/core/models/product.model';
import { FavoriteService } from '@/app/core/services/favorite.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  like: boolean = false;
  private favoriteService = inject(FavoriteService);
  private subscription?: Subscription;

  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() img: string = '';
  @Input() product!: Product;

  @Output() openModalEvent = new EventEmitter<Product>();

  ngOnInit(): void {
    // Set initial state first
    this.like = this.favoriteService.isFavorite(this.product.id);
    
    // Subscribe to changes
    this.subscription = this.favoriteService.favorites$.subscribe(favorites => {
      this.like = favorites.has(this.product.id);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addFav(): void {
    this.favoriteService.toggleFavorite(this.product.id);
  }

  handleClick() {
    this.openModalEvent.emit(this.product);
  }

}
