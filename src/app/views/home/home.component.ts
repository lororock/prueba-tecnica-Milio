import { Component } from '@angular/core';
import { KeywordSearchComponent } from '@/app/shared/keyword-search/keyword-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KeywordSearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

}
