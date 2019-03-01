import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'category-edit-modal',
    templateUrl: './category-edit-modal.component.html',
    styleUrls: ['./category-edit-modal.component.scss']
})
export class CategoryEditModalComponent implements OnInit {

    form: FormGroup;

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

    _categoryId: number = null;

    constructor(private categoryHttp: CategoryHttpService) {
        this.form = new FormBuilder().group({
            name: '',
            active: true
        });
    }

    ngOnInit() {
    }

    showModal(category){

        if(! Number.isInteger(category)){
            this.form.patchValue(category);
            this._categoryId = category.id;
        }else{
            this._categoryId = category;
            this.categoryHttp.get(category)
                .subscribe(
                    (response) => {this.form.patchValue(response)},
                    (error) => {
                        if(error.status == 401){
                            this.modal.hide()
                        }
                    }
                );
        }

        this.modal.show();
    }

    submit(){

        this.categoryHttp.update(this._categoryId, this.form.value)
            .subscribe((category) => {
                    this.modal.hide();
                    this.onSuccess.emit(category);
                },
                error => {
                    this.onError.emit(error);
                });
    }

    onHideModal(event){
        this.form.patchValue({
            name: '',
            active: true
        });
    }
}
