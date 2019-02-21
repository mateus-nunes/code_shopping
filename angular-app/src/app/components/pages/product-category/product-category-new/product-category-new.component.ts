import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, ProductCategory} from "../../../../model";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";
import {CategoryHttpService} from "../../../../services/http/category-http.service";

@Component({
  selector: 'product-category-new',
  templateUrl: './product-category-new.component.html',
  styleUrls: ['./product-category-new.component.scss']
})
export class ProductCategoryNewComponent implements OnInit {

  categories: Category[];
  categoriesId: number[] = null;

  @Input()
  productId: number;
  @Input()
  productCategory: ProductCategory;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService,private productCategoryHttp: ProductCategoryHttpService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.categoryHttp.list({all: true}).subscribe((response) => {
      this.categories = response.data;
    })
  }

  submit(){

    let categories = this.productCategory.categories.map(item => item.id);

    categories = categories.concat(this.categoriesId);

    this.productCategoryHttp.create(this.productId, categories)
        .subscribe(
            (productCategory) => this.onSuccess.emit(productCategory),
            (error) => this.onError.emit(error)
        );

    return false;
  }
}
