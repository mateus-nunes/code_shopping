
import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../../model";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.scss']
})
export class ProductDeleteModalComponent implements OnInit {

  product: Product = null;

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

  destroy(){
    this.productHttp.destroy(this.product.id)
        .subscribe((product) => {
              this.modal.hide();
              this.onSuccess.emit(product);
            },
            error => {
              this.onError.emit(error);
            });
  }
}
