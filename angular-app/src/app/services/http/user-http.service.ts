import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {User} from "../../model";
import {map} from "rxjs/internal/operators";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService implements HttpResource<User>{

  private baseUrl = `${environment.api.url}/users`;

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams): Observable<{data: Array<User>, meta: any}>{
    let params = new SearchParamsBuilder(searchParams).make();

    return this.http.get<{data: Array<User>, meta: any}>(`${this.baseUrl}/`,{
      params
    });
  }

  get(id: number): Observable<User>{
    return this.http.get<{data:User}>(`${this.baseUrl}/${id}`).pipe(
        map(response => response.data)
    );
  }

  create(data: User): Observable<User>{
    return this.http.post<{data: User}>(this.baseUrl, data).pipe(
        map(response => response.data)
    );
  }

  update(id:number, data: User): Observable<User>{
    return this.http.put<{data: User}>(`${this.baseUrl}/${id}`, data).pipe(
        map(response => response.data)
    );
  }

  destroy(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
