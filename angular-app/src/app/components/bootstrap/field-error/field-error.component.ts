import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ValidationMessage} from "../../../common/validation-message";

@Component({
  selector: 'field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
  host: {
    'class': 'invalid-feedback'
  }
})
export class FieldErrorComponent implements OnInit {

  @Input()
  field: FormControl;

  constructor() { }

  ngOnInit() {
  }

  get errors(){
    return this.field.errors;
  }

  get errorKeys() {
    return Object.keys(this.errors);
  }

  getMessage(error){
    return ValidationMessage.getMessage(error,['Nome']);
  }

  showError(){
    return this.field.invalid && (this.field.dirty || this.field.touched)
  }
}
