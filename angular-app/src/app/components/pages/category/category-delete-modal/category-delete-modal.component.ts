
import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Category} from "../../../../model";
import {CategoryHttpService} from "../../../../services/http/category-http.service";

@Component({
  selector: 'category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.scss']
})
export class CategoryDeleteModalComponent implements OnInit {

  category: Category = null;

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService) { }

  ngOnInit() {
  }

  showModal(category){

    if(! Number.isInteger(category)){
      this.category = category;
    }else{
      this.categoryHttp.get(category).subscribe(response => this.category = response);
    }

    this.modal.show();
  }

  destroy(){
    const token = window.localStorage.getItem('token');

    this.categoryHttp.destroy(this.category.id)
        .subscribe((category) => {
              this.modal.hide();
              this.onSuccess.emit(category);
            },
            error => {
              this.onError.emit(error);
            });
  }
}
