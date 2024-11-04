import { Component } from '@angular/core';
import { KeywordSearchComponent } from '@/app/shared/keyword-search/keyword-search.component';
import { CategoryCardComponent } from '@/app/shared/category-card/category-card.component';
import { ProductCardComponent } from '@/app/shared/product-card/product-card.component';
import { ProductService } from '@/app/core/services/product.service';
import { Product } from '@/app/core/models/product.model';
import { PopUpsDescriptionComponent } from '../../shared/pop-ups-description/pop-ups-description.component';
import { PopUpBagComponent } from "../../shared/pop-up-bag/pop-up-bag.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    KeywordSearchComponent,
    CategoryCardComponent,
    ProductCardComponent,
    PopUpsDescriptionComponent,
    PopUpBagComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public products: Product[] = [];
  public showModal = false;
  public showModalBag = true;
  public selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }

  categories = [
    { id: 1, icon: '👟', text: 'Ropa' },
    { id: 2, icon: '⚽', text: 'Deporte' },
    { id: 3, icon: '🎮', text: 'Juegos' },
    { id: 4, icon: '🎁', text: 'Regalos' },
    { id: 5, icon: '🧳', text: 'Maletas' },
    { id: 6, icon: '🎄', text: 'Navidad' },
    { id: 7, icon: '👓', text: 'Gafas' },
  ];

  openModal(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }
  openModalBag() {
    this.showModalBag = true;
  }

  closeModal() {
    this.showModal = false;
  }
  closeModalBag() {
    this.showModalBag = false;
  }
}
