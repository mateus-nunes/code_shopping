import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../../model";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent implements OnInit {

  product: Product = {
    name: '',
    active: true
  };

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productHttp: ProductHttpService) { }

  ngOnInit() {
  }

  showModal(product){

    if(! Number.isInteger(product)){
      this.product = product;
    }else{
      this.productHttp.get(product).subscribe(response => this.product = response);
    }

    this.modal.show();
  }

  submit(){

    this.productHttp.update(this.product.id, this.product)
        .subscribe((product) => {
              this.modal.hide();
              this.onSuccess.emit(product);
            },
            error => {
              this.onError.emit(error);
            });
  }

}
