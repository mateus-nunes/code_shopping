import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../../model";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import fieldOptionsUser from "../user-form/fieldsOptions";

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {

  form: FormGroup;

  errors: {} = {};

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  _userId:number = null;

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

  showModal(user){

    if(! Number.isInteger(user)){
      this.form.patchValue(user);
      this._userId = user.id;
    }else{
      this._userId = user;
      this.userHttp.get(user)
          .subscribe(
              (response:User) => {this.form.patchValue(response)},
              (error) => {
                if(error.status == 401){
                  this.modal.hide()
                }
              }
          );
    }

    this.modal.show();
  }

  submit(){

    this.userHttp.update(this._userId, this.form.value)
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
