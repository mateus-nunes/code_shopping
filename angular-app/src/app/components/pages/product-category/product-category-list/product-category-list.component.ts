import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {Product, ProductCategory} from "../../../../model";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {

  productId: number = null;
  product: Product = null;
  productCategory: ProductCategory = null;

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

  onInsertSuccess(productCategory){
    this.notifyMessage.success('Categoria incluida com sucesso');
    this.getProductCategory();
  }

  onInsertError(e){
    console.log(e);
    this.notifyMessage.error('Houve um erro desconhecido ao incluir a categoria');
  }
}
