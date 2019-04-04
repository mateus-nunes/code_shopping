import {ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldOptionsProductInput from "../../product-input/product-input-form/fieldsOptions";
import {Product} from "../../../../model";
import {ProductIdFieldService} from "./product-id-field.service";
import {Select2Component} from "ng2-select2";

@Component({
  selector: 'product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.scss']
})
export class ProductInputFormComponent implements OnInit, OnChanges {
  products: Array<Product>;

  @Input()
  form: FormGroup;

  @ViewChild(Select2Component, {read: ElementRef})
  select2Element: ElementRef;

  constructor(private changeRef: ChangeDetectorRef, public productIdField: ProductIdFieldService) { }

  ngOnInit() {
    this.productIdField.make(this.select2Element, this.form.get('product_id'));
  }

  ngOnChanges(): void {
    this.changeRef.detectChanges();
  }

  get fieldsOptions(){
    return fieldOptionsProductInput;
  }
}
