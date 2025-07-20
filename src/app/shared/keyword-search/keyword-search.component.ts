import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'keyword-search',
  standalone: true,
  imports: [],
  templateUrl: './keyword-search.component.html',
  styleUrls: ['./keyword-search.component.css']
})
export class KeywordSearchComponent {
  @Output() searchChange = new EventEmitter<string>();

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
}
