import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldOptionsCategory from "./fieldsOptions";

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnChanges {

  @Input()
  form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.changeRef.detectChanges();
  }

  get fieldsOptions(){
    return fieldOptionsCategory;
  }
}
