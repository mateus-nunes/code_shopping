import {Component, OnInit, ViewChild} from '@angular/core';
import {UserNewModalComponent} from "../user-new-modal/user-new-modal.component";
import {UserEditModalComponent} from "../user-edit-modal/user-edit-modal.component";
import {UserDeleteModalComponent} from "../user-delete-modal/user-delete-modal.component";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {User} from "../../../../model";
import {UserInsertService} from "./user-insert.service";
import {UserEditService} from "./user-edit.service";
import {UserDeleteService} from "./user-delete.service";
import {SearchParams} from "../../../../services/http/http-resource";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Array<User> = [];

  sortColumn = {column: 'created_at', sort: 'desc'};

  searchText: string = '';

  pagination = {
    perPage: 20,
    page: 1,
    totalItems: 0
  };

  @ViewChild(UserNewModalComponent)
  userNewModal: UserNewModalComponent;

  @ViewChild(UserEditModalComponent)
  userEditModal: UserEditModalComponent;

  @ViewChild(UserDeleteModalComponent)
  userDeleteModal: UserDeleteModalComponent;

  constructor(private userHttp: UserHttpService,
              protected userInsertService: UserInsertService,
              protected userDeleteService: UserDeleteService,
              protected userEditService: UserEditService,
  ) {

    this.userInsertService.userListComponent = this;
    this.userDeleteService.userListComponent = this;
    this.userEditService.userListComponent = this;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    let searchParams: SearchParams = {
      page: this.pagination.page,
      perPage: this.pagination.perPage,
      sort: this.sortColumn.column === "" ? null : this.sortColumn,
      search: this.searchText
    };

    this.userHttp.list(searchParams).subscribe(response => {
      this.users = response.data;

      this.pagination.page = response.meta.current_page;
      this.pagination.totalItems = response.meta.total;
      this.pagination.perPage = response.meta.per_page;
    });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getUsers();
  }

  sort(){
    this.pagination.page = 1;

    this.getUsers();
  }

  search(search){
    this.searchText = search;
    this.getUsers();
  }

}
