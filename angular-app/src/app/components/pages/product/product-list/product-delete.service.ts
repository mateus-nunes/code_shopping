import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductDeleteService{

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set productListComponent(value: ProductListComponent){
        this._productListComponent = value;
    }

    onDeleteSuccess(product){
        this.notifyMessage.success('Produto deletado com sucesso');
        this._productListComponent.getProducts();
    }

    onDeleteError(e){
        console.log(e);
        this.notifyMessage.error(`Houve um erro desconhecido ao excluir o produto`);
    }

    showModalDelete(product){
        this._productListComponent.productDeleteModal.showModal(product);
    }
}