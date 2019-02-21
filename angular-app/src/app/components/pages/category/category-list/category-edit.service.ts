import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CategoryEditService{

    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }

    onEditSuccess(category){
        this.notifyMessage.success('Categoria editada com sucesso');
        this._categoryListComponent.getCategories();
    }

    onEditError(e){
        console.log(e);
        this.notifyMessage.error('Houve um erro desconhecido ao editar a categoria');
    }

    showModalEdit(category){
        this._categoryListComponent.categoryEditModal.showModal(category);
    }
}