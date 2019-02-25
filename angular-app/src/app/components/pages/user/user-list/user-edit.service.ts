import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserListComponent} from "./user-list.component";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserEditService{

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set userListComponent(value: UserListComponent){
        this._userListComponent = value;
    }

    onEditSuccess(user){
        this.notifyMessage.success('Usuário editado com sucesso');
        this._userListComponent.getUsers();
    }

    onEditError(e){
        console.log(e);
        this.notifyMessage.error('Houve um erro desconhecido ao editar o usuário');
    }

    showModalEdit(user){
        this._userListComponent.userEditModal.showModal(user);
    }
}