import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserListComponent} from "./user-list.component";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserDeleteService{

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set userListComponent(value: UserListComponent){
        this._userListComponent = value;
    }

    onDeleteSuccess(user){
        this.notifyMessage.success('Usuário deletado com sucesso');
        this._userListComponent.getUsers();
    }

    onDeleteError(e){
        console.log(e);
        this.notifyMessage.error(`Houve um erro desconhecido ao excluir o usuário`);
    }

    showModalDelete(user){
        this._userListComponent.userDeleteModal.showModal(user);
    }
}