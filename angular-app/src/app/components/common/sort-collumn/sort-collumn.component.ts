import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: '[sortColumn]',
  templateUrl: './sort-collumn.component.html',
  styleUrls: ['./sort-collumn.component.scss']
})
export class SortCollumnComponent implements OnInit {

  @Input()
  sortColumn: {column: string, sort: string};

  @Input()
  columnName: string;

  @Output()
  onSort: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click')
  changeSort(){
    this.sortColumn.column = this.columnName;
    this.sortColumn.sort = this.sortColumn.sort === "desc" ? "asc" : "desc";
    this.onSort.emit(this.sortColumn);
  }

  showArrowDown(){
    return this.columnName == this.sortColumn.column && this.sortColumn.sort === "desc";
  }

  showArrowUp(){
    return this.columnName == this.sortColumn.column && this.sortColumn.sort === "asc";
  }

  showArrowAlt(){
    return this.columnName !== this.sortColumn.column;
  }
}
