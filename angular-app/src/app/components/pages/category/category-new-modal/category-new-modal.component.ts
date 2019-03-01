import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Category} from "../../../../model";

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.scss']
})
export class CategoryNewModalComponent implements OnInit {

  form: FormGroup;

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name:'',
      active: true
    })
  }

  ngOnInit() {
  }

  showModal(){
    this.modal.show();
  }

  submit(){
    this.categoryHttp.create(this.form.value)
        .subscribe((category:Category) => {
              this.form.reset({
                name: '',
                active: true
              });

              this.modal.hide();
              this.onSuccess.emit(category);
            },
            error => {
              this.onError.emit(error);
            });
  }

}
