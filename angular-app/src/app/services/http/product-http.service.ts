import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Product} from "../../model";
import {map} from "rxjs/internal/operators";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product>{

  private baseUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams): Observable<{data: Array<Product>, meta: any}>{

    const token = this.getToken();

    let params = new SearchParamsBuilder(searchParams).make();

    return this.http.get<{data: Array<Product>, meta: any}>(`${this.baseUrl}/`,{
      params,
      headers:{
        'Authorization': `Bearer ${token}}`
      }
    });
  }

  get(id: number): Observable<Product>{

    const token = this.getToken();

    return this.http.get<{data:Product}>(`${this.baseUrl}/${id}`,{
      headers:{
        'Authorization': `Bearer ${token}}`
      }
    }).pipe(
        map(response => response.data)
    );
  }

  create(data: Product): Observable<Product>{
    const token = this.getToken();

    return this.http.post<{data: Product}>(this.baseUrl, data,{
      headers:{
        'Authorization': `Bearer ${token}}`
      }
    }).pipe(
        map(response => response.data)
    );
  }

  update(id:number, data: Product): Observable<Product>{
    const token = this.getToken();

    return this.http.put<{data: Product}>(`${this.baseUrl}/${id}`, data,{
      headers:{
        'Authorization': `Bearer ${token}}`
      }
    }).pipe(
        map(response => response.data)
    );
  }

  destroy(id:number): Observable<any>{
    const token = this.getToken();

    return this.http.delete(`${this.baseUrl}/${id}`,{
      headers:{
        'Authorization': `Bearer ${token}}`
      }
    });
  }

  private getToken(): string{
    return window.localStorage.getItem('token');
  }
}
