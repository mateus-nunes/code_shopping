import {NotifyMessageService} from "../../../../services/notify-message.service";
import {Injectable} from "@angular/core";
import {ProductInputListComponent} from "./product-input-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductInputInsertService{

    private _productInputListComponent: ProductInputListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set productInputListComponent(value: ProductInputListComponent){
        this._productInputListComponent = value;
    }

    onInsertSuccess(input){
        this.notifyMessage.success('Entrada registrada com sucesso');
        this._productInputListComponent.getInputs();
    }

    onInsertError(e){
        console.log(e);
        this.notifyMessage.error('Houve um erro desconhecido ao registrar a entrada do produto');
    }

    showModalInsert(){
        this._productInputListComponent.productInputNewModal.showModal();
    }
}