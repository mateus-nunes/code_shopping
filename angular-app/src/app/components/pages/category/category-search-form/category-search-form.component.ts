import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'category-search-form',
  templateUrl: './category-search-form.component.html',
  styleUrls: ['./category-search-form.component.scss']
})
export class CategorySearchFormComponent implements OnInit {

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
