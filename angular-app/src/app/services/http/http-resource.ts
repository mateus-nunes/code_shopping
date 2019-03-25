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
    perPage?: number;
    all?:any;
    search?: string;
    sort?:{
        column: string,
        sort: string
    }
}

export class SearchParamsBuilder{
    constructor(private searchParams: SearchParams){}

    make(): HttpParams{
        let params = new HttpParams();

        if(this.searchParams.page) {
            params = params.set('page', this.searchParams.page + "");
        }

        if(this.searchParams.perPage) {
            params = params.set('per-page', this.searchParams.perPage + "");
        }

        if(this.searchParams.all){
            params = params.set('all', '1');
            params = params.delete('page');
        }

        if(this.searchParams.search && this.searchParams.search !== ""){
            params = params.set('search', this.searchParams.search);
        }

        if(this.searchParams.sort){
            const sortSymbol = this.searchParams.sort.sort == 'desc' ? '-' : '';
            const columnName = this.searchParams.sort.column;

            params = params.set('sort', `${sortSymbol}${columnName}`);
        }

        return params;
    }

}