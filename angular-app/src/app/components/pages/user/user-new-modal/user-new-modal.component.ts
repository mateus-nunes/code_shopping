import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../../model";
import {UserHttpService} from "../../../../services/http/user-http.service";

@Component({
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.scss']
})
export class UserNewModalComponent implements OnInit {

  user: User = {
    name: '',
    email: ''
  };

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private userHttp: UserHttpService) { }

  ngOnInit() {
  }

  showModal(){
    this.modal.show();
  }

  submit(){
    this.userHttp.create(this.user)
        .subscribe((user:User) => {
              this.modal.hide();
              this.onSuccess.emit(user);
            },
            error => {
              this.onError.emit(error);
            });
  }

}
