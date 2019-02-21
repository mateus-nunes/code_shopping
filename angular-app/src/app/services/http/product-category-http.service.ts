import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {ProductCategory} from "../../model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryHttpService {

    private baseApi: string = 'http://localhost:8000/api';

    constructor(private http: HttpClient) { }

    list(productId: number): Observable<ProductCategory>{
        const token = this.getToken();

        return this.http
            .get<{data: ProductCategory}>(this.getBaseUrl(productId),{
                headers:{
                    'Authorization': `Bearer ${token}}`
                }
            })
            .pipe(
                map(response => response.data)
            );
    }

    create(productId: number, categoriesId: number[]): Observable<ProductCategory>{
        const token = this.getToken();

        return this.http
            .post<{data: ProductCategory}>(this.getBaseUrl(productId),{categories: categoriesId},{
                headers:{
                    'Authorization': `Bearer ${token}}`
                }
            })
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

    private getToken(): string{
        return window.localStorage.getItem('token');
    }
}
