import {NotifyMessageService} from "../../../../services/notify-message.service";
import {Injectable} from "@angular/core";
import {ProductOutputListComponent} from "./product-output-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductOutputInsertService{

    private _productOutputListComponent: ProductOutputListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set productOutputListComponent(value: ProductOutputListComponent){
        this._productOutputListComponent = value;
    }

    onInsertSuccess(output){
        this.notifyMessage.success('Saida registrada com sucesso');
        this._productOutputListComponent.getOutputs();
    }

    onInsertError(e){
        console.log(e);
        this.notifyMessage.error('Houve um erro desconhecido ao registrar a saida do produto');
    }

    showModalInsert(){
        this._productOutputListComponent.productOutputNewModal.showModal();
    }
}