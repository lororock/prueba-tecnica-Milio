import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openModalBagSource = new Subject<void>();
  openModalBag$ = this.openModalBagSource.asObservable();

  triggerOpenModalBag() {
    this.openModalBagSource.next();
  }
}