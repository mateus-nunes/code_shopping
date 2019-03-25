import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../../model";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import fieldOptionsUser from "../user-form/fieldsOptions";

@Component({
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.scss']
})
export class UserNewModalComponent implements OnInit {

  form: FormGroup;

  errors: {} = {};

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private userHttp: UserHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required, Validators.maxLength(this.fieldsOptions.name.validationMessage.maxlength)]],
      email: ['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(this.fieldsOptions.password.validationMessage.minlength)]],
      password_confirmation:['',[Validators.required, Validators.minLength(this.fieldsOptions.password.validationMessage.minlength)]],
    });
  }

  ngOnInit() {
  }

  showModal(){
    this.modal.show();
  }

  submit(){
    console.log(this.form.value);
    this.userHttp.create(this.form.value)
        .subscribe((user:User) => {

              this.form.reset({
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
              });

              this.modal.hide();
              this.onSuccess.emit(user);
            },
            responseError => {
              console.log(responseError);

              if(responseError.status === 422){
                this.errors = responseError.error.errors;
              }

              this.onError.emit(responseError);
            });
  }

  get fieldsOptions() {
    return fieldOptionsUser;
  }

  showErrors(){
    return Object.keys(this.errors).length > 0;
  }

}
