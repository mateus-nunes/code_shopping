import {Observable} from "rxjs/internal/observable";
import {HttpParams} from "@angular/common/http";

export interface HttpResource<T>{

    list(searchParms: SearchParams): Observable<{data: Array<T>, meta: any}>;

    get(id: number): Observable<T>;

    create(data: T): Observable<T>;

    update(id:number, data: T): Observable<T>;

    destroy(id:number): Observable<any>;
}

export interface SearchParams{
    page?: number;
    all?:any;
}

export class SearchParamsBuilder{
    constructor(private searchParams: SearchParams){}

    make(): HttpParams{
        let params = new HttpParams();

        if(this.searchParams.page) {
            params = params.set('page', this.searchParams.page + "");
        }

        if(this.searchParams.all){
            params = params.set('all', '1');
            params = params.delete('page');
        }

        return params;
    }

}