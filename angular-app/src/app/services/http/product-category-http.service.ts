import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {ProductCategory} from "../../model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryHttpService {

    private baseApi: string = `${environment.api.url}`;

    constructor(private http: HttpClient) { }

    list(productId: number): Observable<ProductCategory>{
        return this.http
            .get<{data: ProductCategory}>(this.getBaseUrl(productId))
            .pipe(
                map(response => response.data)
            );
    }

    create(productId: number, categoriesId: number[]): Observable<ProductCategory>{
        return this.http
            .post<{data: ProductCategory}>(this.getBaseUrl(productId),{categories: categoriesId})
            .pipe(
                map(response => response.data)
            );
    }

    private getBaseUrl(productId: number, categoryId: number = null): string{
        let url = `${this.baseApi}/products/${productId}/categories`;

        if(categoryId){
            url += `/${categoryId}`;
        }
        return url;
    }
}
