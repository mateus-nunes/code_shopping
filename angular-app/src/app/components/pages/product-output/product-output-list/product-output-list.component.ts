import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductOutput} from "../../../../model";
import {SearchParams} from "../../../../services/http/http-resource";
import {ProductOutputNewModalComponent} from "../product-output-new-modal/product-output-new-modal.component";
import {ProductOutputInsertService} from "./product-output-insert.service";
import {ProductOutputHttpService} from "../../../../services/http/product-output-http.service";

@Component({
  selector: 'product-output-list',
  templateUrl: './product-output-list.component.html',
  styleUrls: ['./product-output-list.component.scss']
})
export class ProductOutputListComponent implements OnInit {

  outputs: Array<ProductOutput> = [];

  sortColumn = {column: 'created_at', sort: 'desc'};

  searchText: string = '';

  pagination = {
    perPage: 20,
    page: 1,
    totalItems: 0
  };

  @ViewChild(ProductOutputNewModalComponent)
  productOutputNewModal: ProductOutputNewModalComponent;

  constructor(private productOutputHttp: ProductOutputHttpService,
              protected productOutputInsertService: ProductOutputInsertService
  ) {

    this.productOutputInsertService.productOutputListComponent = this;
  }

  ngOnInit() {
    this.getOutputs();
  }

  getOutputs(){
    let searchParams: SearchParams = {
      page: this.pagination.page,
      perPage: this.pagination.perPage,
      sort: this.sortColumn.column === "" ? null : this.sortColumn,
      search: this.searchText
    };

    this.productOutputHttp.list(searchParams).subscribe(response => {
      this.outputs = response.data;

      this.pagination.page = response.meta.current_page;
      this.pagination.totalItems = response.meta.total;
      this.pagination.perPage = response.meta.per_page;
    });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getOutputs();
  }

  sort(){
    this.pagination.page = 1;

    this.getOutputs();
  }

  search(search){
    this.searchText = search;
    this.getOutputs();
  }

}
