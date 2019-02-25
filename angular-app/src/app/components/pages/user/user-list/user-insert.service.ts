import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserListComponent} from "./user-list.component";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserInsertService{

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set userListComponent(value: UserListComponent){
        this._userListComponent = value;
    }

    onInsertSuccess(user){
        this.notifyMessage.success('Usuário cadastrado com sucesso');
        this._userListComponent.getUsers();
    }

    onInsertError(e){
        console.log(e);
        this.notifyMessage.error('Houve um erro desconhecido ao cadastrar o usuário');
    }

    showModalInsert(){
        this._userListComponent.userNewModal.showModal();
    }
}