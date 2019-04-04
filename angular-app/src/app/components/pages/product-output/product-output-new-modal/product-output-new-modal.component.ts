import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductOutput} from "../../../../model";
import fieldOptionsProductOutput from "../../product-output/product-output-form/fieldsOptions";
import {ProductOutputHttpService} from "../../../../services/http/product-output-http.service";

@Component({
  selector: 'product-output-new-modal',
  templateUrl: './product-output-new-modal.component.html',
  styleUrls: ['./product-output-new-modal.component.scss']
})
export class ProductOutputNewModalComponent implements OnInit {

  form: FormGroup;

  errors: {} = {};

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productOutputHttp: ProductOutputHttpService, private formBuilder: FormBuilder) {
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
    this.productOutputHttp.create(this.form.value)
        .subscribe((output:ProductOutput) => {
              this.form.reset({
                amount: '',
                product_id: null
              });

              this.modal.hide();
              this.onSuccess.emit(output);
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
    return fieldOptionsProductOutput;
  }

  showErrors(){
    return Object.keys(this.errors).length > 0;
  }
}
