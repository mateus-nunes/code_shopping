import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../../model";
import {UserHttpService} from "../../../../services/http/user-http.service";

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {

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

  showModal(user){

    if(! Number.isInteger(user)){
      this.user = user;
    }else{
      this.userHttp.get(user).subscribe(response => this.user = response);
    }

    this.modal.show();
  }

  submit(){

    this.userHttp.update(this.user.id, this.user)
        .subscribe((user) => {
              this.modal.hide();
              this.onSuccess.emit(user);
            },
            error => {
              this.onError.emit(error);
            });
  }

}
