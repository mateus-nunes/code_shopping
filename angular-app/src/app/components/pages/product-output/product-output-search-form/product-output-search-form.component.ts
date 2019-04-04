import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'product-output-search-form',
  templateUrl: './product-output-search-form.component.html',
  styleUrls: ['./product-output-search-form.component.scss']
})
export class ProductOutputSearchFormComponent implements OnInit {

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
