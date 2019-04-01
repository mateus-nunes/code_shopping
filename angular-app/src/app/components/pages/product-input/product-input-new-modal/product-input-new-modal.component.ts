import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {Product, ProductInput} from "../../../../model";
import fieldOptionsProductInput from "../../product-input/product-input-form/fieldsOptions";
import {ProductInputHttpService} from "../../../../services/http/product-input-http.service";

@Component({
  selector: 'product-input-new-modal',
  templateUrl: './product-input-new-modal.component.html',
  styleUrls: ['./product-input-new-modal.component.scss']
})
export class ProductInputNewModalComponent implements OnInit {

  form: FormGroup;

  errors: {} = {};

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productInputHttp: ProductInputHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      amount: ['',[Validators.required, Validators.min(this.fieldsOptions.amount.validationMessage.min)]],
      product_id: ['',[Validators.required]],
    });
  }

  ngOnInit() {
  }

  showModal(){
    this.modal.show();
  }

  submit(){
    this.productInputHttp.create(this.form.value)
        .subscribe((input:ProductInput) => {
              this.form.reset({
                amount: '',
                product_id: ''
              });

              this.modal.hide();
              this.onSuccess.emit(input);
            },
            responseError => {
              console.log(responseError);

              if(responseError.status === 422){
                this.errors = responseError.error.errors;
              }

              this.onError.emit(responseError);
            });
  }

  get fieldsOptions(){
    return fieldOptionsProductInput;
  }

  showErrors(){
    return Object.keys(this.errors).length > 0;
  }
}
