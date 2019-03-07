import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FieldsOptions} from "../../../common/fields-options";

const fieldOptionsLogin: FieldsOptions = {
  email:{
    id: 'email',
    label: 'E-mail',
    validationMessage:{
      maxlength: 255,
      email: true
    }
  },
  password:{
    id: 'password',
    label: 'Senha',
    validationMessage:{
      maxlength: 255,
      minlength: 4
    }
  }
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  errors: {} = {};

  showMessageError = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.maxLength(this.maxLengthEmail)]],
      password: ['', [Validators.maxLength(this.maxLengthPass), Validators.minLength(this.minLengthPass)]]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.authService
        .login(this.form.value)
        .subscribe((data) =>{
              this.router.navigate(['categories/list']);
            },
            responseError => {
              console.log(responseError);

              if(responseError.status === 422){
                this.errors = responseError.error.errors;
              }

              if(responseError.status == 400){
                this.showMessageError = true;
              }
            });
    return false;
  }

  get fieldsOptions(){
    return fieldOptionsLogin;
  }

  get maxLengthEmail(){
    return this.fieldsOptions.email.validationMessage.maxlength;
  }

  get minLengthPass(){
    return this.fieldsOptions.password.validationMessage.minlength;
  }

  get maxLengthPass(){
    return this.fieldsOptions.password.validationMessage.maxlength;
  }

  showErrors(){
    return Object.keys(this.errors).length > 0;
  }
}
