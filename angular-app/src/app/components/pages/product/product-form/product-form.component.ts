import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldOptionsProduct from "./fieldsOptions";

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Input()
  form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.changeRef.detectChanges();
  }

  get fieldsOptions(){
    return fieldOptionsProduct;
  }
}
