import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CategoryInsertService{

    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }

    onInsertSuccess(category){
        this.notifyMessage.success('Categoria cadastrada com sucesso');
        this._categoryListComponent.getCategories();
    }

    onInsertError(e){
        console.log(e);
        this.notifyMessage.error('Houve um erro desconhecido ao cadastrar a categoria');
    }

    showModalInsert(){
        this._categoryListComponent.categoryNewModal.showModal();
    }
}