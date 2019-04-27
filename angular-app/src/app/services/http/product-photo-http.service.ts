import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Product, ProductPhoto} from "../../model";

@Injectable({
  providedIn: 'root'
})
export class ProductPhotoHttpService {

  private baseApi: string = `${environment.api.url}`;

  constructor(private http: HttpClient) { }

  list(productId: number): Observable<{product: Product, photos: ProductPhoto[]}>{
    return this.http
        .get<{data: any}>(this.getBaseUrl(productId))
        .pipe(
            map(response => response.data)
        );
  }

  create(productId: number, files: FileList): Observable<{product:Product, photos: ProductPhoto[]}>{
    const formData = new FormData();
    const filesArray = Array.from(files);

    filesArray.forEach((file) => {
      formData.append('photos[]',file);
    });

    return this.http.post<any>(this.getBaseUrl(productId), formData);
  }

  update(productId: number,photoId: number, file: File): Observable<ProductPhoto>{
    const formData = new FormData();
    formData.append('photo',file);
    formData.append('_method','PUT');

    return this.http
        .post<any>(this.getBaseUrl(productId, photoId) , formData)
        .pipe(
            map(response => response.data)
        );
  }

  destroy(productId: number, photoId: number): Observable<null>{
    return this.http.delete<null>(this.getBaseUrl(productId, photoId));
  }

  private getBaseUrl(productId: number, photoId: number = null): string{
    let url = `${this.baseApi}/products/${productId}/photos`;

    if(photoId){
      url += `/${photoId}`;
    }
    return url;
  }
}
