import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldOptionsProductInput from "../../product-input/product-input-form/fieldsOptions";
import {Product} from "../../../../model";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.scss']
})
export class ProductInputFormComponent implements OnInit, OnChanges {
  products: Array<Product>;

  @Input()
  form: FormGroup;

  constructor(private productHttp: ProductHttpService, private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getProducts();
  }

  ngOnChanges(): void {
    this.changeRef.detectChanges();
  }

  get fieldsOptions(){
    return fieldOptionsProductInput;
  }

  getProducts(){
    this.productHttp.list({all: true, sort:{column: 'name',sort:'asc'}}).subscribe((response) => {
      this.products = response.data;
    })
  }
}
