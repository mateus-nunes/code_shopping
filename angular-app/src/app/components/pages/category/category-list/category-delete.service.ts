import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CategoryDeleteService{

    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }

    onDeleteSuccess(category){
        this.notifyMessage.success('Categoria deletada com sucesso');
        this._categoryListComponent.getCategories();
    }

    onDeleteError(e){
        console.log(e);
        this.notifyMessage.error(`Houve um erro desconhecido ao excluir a categoria
    Certifique-se que não há nenhum produto vinculado a essa categoria`);
    }

    showModalDelete(category){
        this._categoryListComponent.categoryDeleteModal.showModal(category);
    }
}