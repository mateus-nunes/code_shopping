import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductNewModalComponent} from "../product-new-modal/product-new-modal.component";
import {ProductEditModalComponent} from "../product-edit-modal/product-edit-modal.component";
import {ProductDeleteModalComponent} from "../product-delete-modal/product-delete-modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {Product} from "../../../../model";
import {ProductInsertService} from "./product-insert.service";
import {ProductEditService} from "./product-edit.service";
import {ProductDeleteService} from "./product-delete.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> = [];

  pagination = {
    perPage: 15,
    page: 1,
    totalItems: 0
  };

  @ViewChild(ProductNewModalComponent)
  productNewModal: ProductNewModalComponent;

  @ViewChild(ProductEditModalComponent)
  productEditModal: ProductEditModalComponent;

  @ViewChild(ProductDeleteModalComponent)
  productDeleteModal: ProductDeleteModalComponent;

  constructor(private productHttp: ProductHttpService,
              protected productInsertService: ProductInsertService,
              protected productDeleteService: ProductDeleteService,
              protected productEditService: ProductEditService,
  ) {

    this.productInsertService.productListComponent = this;
    this.productDeleteService.productListComponent = this;
    this.productEditService.productListComponent = this;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productHttp.list({page: this.pagination.page}).subscribe(response => {
      this.products = response.data;

      this.pagination.page = response.meta.current_page;
      this.pagination.totalItems = response.meta.total;
      this.pagination.perPage = response.meta.per_page;
    });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getProducts();
  }

}
