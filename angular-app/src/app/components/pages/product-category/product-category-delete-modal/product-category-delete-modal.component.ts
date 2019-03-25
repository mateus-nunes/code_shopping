import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Category, Product} from "../../../../model";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";

@Component({
  selector: 'product-category-delete-modal',
  templateUrl: './product-category-delete-modal.component.html',
  styleUrls: ['./product-category-delete-modal.component.scss']
})
export class ProductCategoryDeleteModalComponent implements OnInit {

  category: Category = null;
  product: Product = null;

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productCategoryHttpService: ProductCategoryHttpService) { }

  ngOnInit() {
  }

  showModal(product,category){

    this.product = product;
    this.category = category;

    this.modal.show();
  }

  destroy(){
    this.productCategoryHttpService.destroy(this.product.id, this.category.id)
        .subscribe((category) => {
              this.modal.hide();
              this.onSuccess.emit(category);
            },
            error => {
              this.onError.emit(error);
            });
  }

  onHideModal(event){
    this.category = {
      name: '',
      active: true
    };

    this.product = {
      name: '',
      active: true
    };
  }
}
