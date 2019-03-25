import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {Product, ProductCategory} from "../../../../model";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductCategoryDeleteModalComponent} from "../product-category-delete-modal/product-category-delete-modal.component";

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {

  productId: number = null;
  product: Product = null;
  productCategory: ProductCategory = null;

  @ViewChild(ProductCategoryDeleteModalComponent)
  productCategoryDeleteModal: ProductCategoryDeleteModalComponent;

  constructor(
      private route: ActivatedRoute,
      private productHttp: ProductHttpService,
      private productCategoryHttp: ProductCategoryHttpService,
      private notifyMessage: NotifyMessageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.productId;
      this.getProduct();
      this.getProductCategory();
    });
  }

  getProduct(){
    this.productHttp.get(this.productId).subscribe((data) => {
      this.product = data;
    })
  }

  getProductCategory(){
    this.productCategoryHttp.list(this.productId)
        .subscribe((response) => {
          this.productCategory = response;
        })
  }

  onInsertSuccess(product, Category){
    this.notifyMessage.success('Categorias incluidas com sucesso');
    this.getProductCategory();
  }

  onInsertError(e){
    console.log(e);
    this.notifyMessage.error('Houve um erro desconhecido ao incluir a categoria');
  }

  onDeleteSuccess(product,category){
    this.notifyMessage.success('Categoria desvinculada com sucesso');
    this.getProductCategory();
  }

  onDeleteError(e){
    console.log(e);
    this.notifyMessage.error(`Houve um erro desconhecido ao desvincular a categoria`);
  }

  showModalDelete(product,category){
    this.productCategoryDeleteModal.showModal(product,category);
  }
}
