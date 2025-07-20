import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCounter } from '../../store/app.store';

@Component({
  selector: 'keyword-search',
  standalone: true,
  imports: [],
  templateUrl: './keyword-search.component.html',
  styleUrls: ['./keyword-search.component.css']
})
export class KeywordSearchComponent implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.select(selectCounter).subscribe((counter) => {
      console.log('Valor de counter desde el store:', counter);
    });
  }
}
