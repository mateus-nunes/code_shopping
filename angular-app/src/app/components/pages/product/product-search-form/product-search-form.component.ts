import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'product-search-form',
  templateUrl: './product-search-form.component.html',
  styleUrls: ['./product-search-form.component.scss']
})
export class ProductSearchFormComponent implements OnInit {

  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();

  search: string = '';
  constructor() { }

  ngOnInit() {
  }

  submit(){
    this.onSearch.emit(this.search);
    return false;
  }
}
