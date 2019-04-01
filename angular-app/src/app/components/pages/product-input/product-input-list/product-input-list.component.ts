import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductInput} from "../../../../model";
import {SearchParams} from "../../../../services/http/http-resource";
import {ProductInputNewModalComponent} from "../product-input-new-modal/product-input-new-modal.component";
import {ProductInputInsertService} from "./product-input-insert.service";
import {ProductInputHttpService} from "../../../../services/http/product-input-http.service";

@Component({
  selector: 'product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.scss']
})
export class ProductInputListComponent implements OnInit {

  inputs: Array<ProductInput> = [];

  sortColumn = {column: 'created_at', sort: 'desc'};

  searchText: string = '';

  pagination = {
    perPage: 20,
    page: 1,
    totalItems: 0
  };

  @ViewChild(ProductInputNewModalComponent)
  productInputNewModal: ProductInputNewModalComponent;

  constructor(private productInputHttp: ProductInputHttpService,
              protected productInputInsertService: ProductInputInsertService
  ) {

    this.productInputInsertService.productInputListComponent = this;
  }

  ngOnInit() {
    this.getInputs();
  }

  getInputs(){
    let searchParams: SearchParams = {
      page: this.pagination.page,
      perPage: this.pagination.perPage,
      sort: this.sortColumn.column === "" ? null : this.sortColumn,
      search: this.searchText
    };

    this.productInputHttp.list(searchParams).subscribe(response => {
      this.inputs = response.data;

      this.pagination.page = response.meta.current_page;
      this.pagination.totalItems = response.meta.total;
      this.pagination.perPage = response.meta.per_page;
    });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getInputs();
  }

  sort(){
    this.pagination.page = 1;

    this.getInputs();
  }

  search(search){
    this.searchText = search;
    this.getInputs();
  }

}
