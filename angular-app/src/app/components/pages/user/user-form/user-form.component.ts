import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldOptionsUser from "./fieldsOptions";

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {

  @Input()
  form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.changeRef.detectChanges();
  }

  get fieldsOptions(){
    return fieldOptionsUser;
  }
}
