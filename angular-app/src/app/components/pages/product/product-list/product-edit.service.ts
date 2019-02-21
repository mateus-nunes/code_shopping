import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductEditService{

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set productListComponent(value: ProductListComponent){
        this._productListComponent = value;
    }

    onEditSuccess(product){
        this.notifyMessage.success('Produto editado com sucesso');
        this._productListComponent.getProducts();
    }

    onEditError(e){
        console.log(e);
        this.notifyMessage.error('Houve um erro desconhecido ao editar o produto');
    }

    showModalEdit(product){
        this._productListComponent.productEditModal.showModal(product);
    }
}