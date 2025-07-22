import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalService } from '@/app/core/services/modal.service';
import { Store } from '@ngrx/store';
import { selectBag } from '@/app/store/app.store';
import { take } from 'rxjs';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  bagEmpty = true;

  constructor(private modalService: ModalService, private store: Store) {
    this.store.select(selectBag).subscribe(bag=>{
      this.bagEmpty = bag.length === 0;
    });
  }

  openBagModal() {
    if(this.bagEmpty){
      alert('No hay productos en la bolsa');
    }else{
      this.modalService.triggerOpenModalBag();
    }
  }
}
