import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Category} from "../../../../model";
import {CategoryHttpService} from "../../../../services/http/category-http.service";

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.scss']
})
export class CategoryNewModalComponent implements OnInit {

  category: Category = {
    name: ''
  };

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService) { }

  ngOnInit() {
  }

  showModal(){
    this.modal.show();
  }

  submit(){
    this.categoryHttp.create(this.category)
        .subscribe((category:Category) => {
              this.modal.hide();
              this.onSuccess.emit(category);
            },
            error => {
              this.onError.emit(error);
            });
  }

}
