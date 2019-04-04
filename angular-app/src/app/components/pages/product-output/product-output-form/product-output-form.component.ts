import {ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewChild, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldOptionsProductOutput from "../../product-output/product-output-form/fieldsOptions";
import {Product} from "../../../../model";
import {ProductIdFieldService} from "./product-id-field.service";
import {Select2Component} from "ng2-select2";

@Component({
  selector: 'product-output-form',
  templateUrl: './product-output-form.component.html',
  styleUrls: ['./product-output-form.component.scss']
})
export class ProductOutputFormComponent implements OnInit, OnChanges {
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
    return fieldOptionsProductOutput;
  }
}
