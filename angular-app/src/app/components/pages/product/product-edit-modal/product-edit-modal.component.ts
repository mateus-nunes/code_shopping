import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../../model";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import fieldOptionsProduct from "../product-form/fieldsOptions";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent implements OnInit {

  form: FormGroup;
  _product_id = null;

  errors: {} = {};

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productHttp: ProductHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required, Validators.maxLength(this.fieldsOptions.name.validationMessage.maxlength)]],
      description: ['',[Validators.required, Validators.minLength(this.fieldsOptions.description.validationMessage.minlength)]],
      price:['',[Validators.required, Validators.min(this.fieldsOptions.price.validationMessage.min)]]
    });
  }

  ngOnInit() {
  }

  showModal(product){

    if(! Number.isInteger(product)){
      this.form.patchValue(product);
      this._product_id = product.id;
    }else{
      this.productHttp.get(product)
          .subscribe((response: Product) => {
            this.form.patchValue(response);
            this._product_id = response.id;
          });
    }

    this.modal.show();
  }

  submit(){

    this.productHttp.update(this._product_id, this.form.value)
        .subscribe((product) => {
              this.form.reset({
                name: '',
                description: '',
                price: null
              });

              this.modal.hide();
              this.onSuccess.emit(product);
            },
            error => {
              this.onError.emit(error);
            });
  }

  get fieldsOptions(){
    return fieldOptionsProduct;
  }

  showErrors(){
    return Object.keys(this.errors).length > 0;
  }
}
