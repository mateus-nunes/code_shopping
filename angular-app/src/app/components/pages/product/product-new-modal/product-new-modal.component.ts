import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../../model";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import fieldOptionsProduct from "../product-form/fieldsOptions";

@Component({
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.scss']
})
export class ProductNewModalComponent implements OnInit {

  form: FormGroup;

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

  showModal(){
    this.modal.show();
  }

  submit(){
    this.productHttp.create(this.form.value)
        .subscribe((product:Product) => {
              this.form.reset({
                name: '',
                description: '',
                price: null
              });

              this.modal.hide();
              this.onSuccess.emit(product);
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
    return fieldOptionsProduct;
  }

  showErrors(){
    return Object.keys(this.errors).length > 0;
  }
}
