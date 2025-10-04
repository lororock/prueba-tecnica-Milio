import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '@/app/core/models/product.model';
import { ProductCardComponent } from '@/app/shared/product-card/product-card.component';
import { ModalDescriptionComponent } from '@/app/shared/modal-description/modal-description.component';
import { FavoriteService } from '@/app/core/services/favorite.service';
import { ProductService } from '@/app/core/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ModalDescriptionComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private favoriteService = inject(FavoriteService);
  private productService = inject(ProductService);
  private router = inject(Router);
  private subscription?: Subscription;

  favoriteProducts: Product[] = [];
  selectedProduct: Product | null = null;

  ngOnInit(): void {
    // Subscribe to favorites changes
    this.subscription = this.favoriteService.favorites$.subscribe(favoriteIds => {
      this.loadFavoriteProducts(favoriteIds);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadFavoriteProducts(favoriteIds: Set<number>): void {
    this.productService.getProducts().subscribe(products => {
      this.favoriteProducts = products.filter(product => favoriteIds.has(product.id));
    });
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}