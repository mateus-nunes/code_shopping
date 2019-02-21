import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductInsertService{

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set productListComponent(value: ProductListComponent){
        this._productListComponent = value;
    }

    onInsertSuccess(product){
        this.notifyMessage.success('Produto cadastrado com sucesso');
        this._productListComponent.getProducts();
    }

    onInsertError(e){
        console.log(e);
        this.notifyMessage.error('Houve um erro desconhecido ao cadastrar o produto');
    }

    showModalInsert(){
        this._productListComponent.productNewModal.showModal();
    }
}