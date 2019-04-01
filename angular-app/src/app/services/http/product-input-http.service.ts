import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SearchParams, SearchParamsBuilder} from "./http-resource";
import {Observable} from "rxjs";
import {ProductInput} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductInputHttpService {

  private baseUrl = `${environment.api.url}/inputs`;

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams): Observable<{data: Array<ProductInput>, meta: any}>{

    let params = new SearchParamsBuilder(searchParams).make();

    return this.http.get<{data: Array<ProductInput>, meta: any}>(`${this.baseUrl}/`,{
      params
    });
  }

  get(id: number): Observable<ProductInput>{
    return this.http.get<{data:ProductInput}>(`${this.baseUrl}/${id}`)
        .pipe(
            map(response => response.data)
        );
  }

  create(data: {product_id: number, amount: number}): Observable<ProductInput>{
    return this.http.post<{data: ProductInput}>(this.baseUrl, data)
        .pipe(
            map(response => response.data)
        );
  }

}
