import { ModalService } from './../../core/services/modal.service';
import { Component } from '@angular/core';
import { KeywordSearchComponent } from '@/app/shared/keyword-search/keyword-search.component';
import { CategoryCardComponent } from '@/app/shared/category-card/category-card.component';
import { ProductCardComponent } from '@/app/shared/product-card/product-card.component';
import { ProductService } from '@/app/core/services/product.service';
import { ModalDescriptionComponent } from '@/app/shared/modal-description/modal-description.component';
import { ModalBagComponent } from '@/app/ui/modal-bag/modal-bag.component';
import { ModalTicketComponent } from '@/app/ui/modal-ticket/modal-ticket.component';
import { Product } from '@/app/core/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    KeywordSearchComponent,
    CategoryCardComponent,
    ProductCardComponent,
    ModalDescriptionComponent,
    ModalBagComponent,
    ModalTicketComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public products: Product[] = [];
  private allProducts: Product[] = [];
  public showModal: boolean = false;
  public showModalBag: boolean = false;
  public showModalTicket: boolean = false;
  public selectedProduct: Product | null = null;
  public ticketTotal: number = 0;
  private subscription!: Subscription;

  constructor(
    private ModalService: ModalService,
    private productService: ProductService
  ) {
    this.loadProducts();
  }

  ngOnInit() {
    this.subscription = this.ModalService.openModalBag$.subscribe(() => {
      this.toggleModalBag();
    });
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.allProducts = products;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }

  filterProducts(term: string) {
    if (!term) {
      this.products = this.allProducts;
      return;
    }
    const lower = term.toLowerCase();
    this.products = this.allProducts.filter(p => p.name.toLowerCase().includes(lower));
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

  selectedCategoryId: number = 1; // first selected by default

  selectCategory(id: number) {
    this.selectedCategoryId = id;
    // If product filtering by category needed, implement here
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  toggleModalBag() {
    this.showModalBag = !this.showModalBag;
  }
  togglelTicket() {
    this.showModalTicket = !this.showModalTicket;
  }

  openTicket(total: number){
    this.ticketTotal = total;
    this.showModalTicket = true;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
