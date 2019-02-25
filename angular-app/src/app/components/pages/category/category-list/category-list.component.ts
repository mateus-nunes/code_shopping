import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {Category} from "../../../../model";
import {CategoryInsertService} from "./category-insert.service";
import {CategoryEditService} from "./category-edit.service";
import {CategoryDeleteService} from "./category-delete.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category> = [];

  pagination = {
    perPage: 5,
    page: 1,
    totalItems: 0
  };

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;

  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;

  constructor(private categoryHttp: CategoryHttpService,
              protected categoryInsertService: CategoryInsertService,
              protected categoryDeleteService: CategoryDeleteService,
              protected categoryEditService: CategoryEditService,
  ) {

    this.categoryInsertService.categoryListComponent = this;
    this.categoryDeleteService.categoryListComponent = this;
    this.categoryEditService.categoryListComponent = this;
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.categoryHttp.list({all: true}).subscribe(response => {
      this.categories = response.data;

      // this.pagination.page = response.meta.current_page;
      // this.pagination.totalItems = response.meta.total;
      // this.pagination.perPage = response.meta.per_page;
    });
  }

  pageChanged(page){
    this.pagination.page = page;
    // this.getCategories();
  }

}
