import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service";
import {ActivatedRoute} from "@angular/router";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";

@Component({
  selector: 'product-photo-edit-modal',
  templateUrl: './product-photo-edit-modal.component.html',
  styleUrls: ['./product-photo-edit-modal.component.scss']
})
export class ProductPhotoEditModalComponent implements OnInit {

  productId = null;

  errors: {} = {};

  @Input()
  photoId: number;

  @ViewChild(ModalComponent) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productPhotoHttp: ProductPhotoHttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.productId
    })
  }

  edit(files: FileList){
    if(files.length <= 0){
      return;
    }

    this.productPhotoHttp.update(this.productId, this.photoId, files[0])
        .subscribe((data) => {

              this.onSuccess.emit(data);
            },
            responseError => {
              console.log(responseError);

              if(responseError.status === 422){
                this.errors = responseError.error.errors;
              }

              this.onError.emit(responseError);
            });
  }

  showModal(){
    this.modal.show();
  }

  hideModal(){
    this.modal.hide();
  }

  showErrors(){
    return Object.keys(this.errors).length > 0;
  }
}
