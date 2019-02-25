import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/internal/operators";
import {User} from "../model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";

const TOKEN_KEY = 'code_shopping_token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    me: User = null;

    constructor(private http: HttpClient) { }

    login(user:{email:string, password: string}): Observable<{token: string}>{
        return this.http
            .post<{token: string}>(`${environment.api.url}/login`, user)
            .pipe(
                tap(response => {
                    this.setToken(response.token);
                })
            );
    }

    setToken(token: string){
        this.setUserFromToken(token);
        if(token) {
            window.localStorage.setItem(TOKEN_KEY, token);
        }else{
            window.localStorage.removeItem(TOKEN_KEY);
        }
    }

    getToken(): string | null{
        return window.localStorage.getItem(TOKEN_KEY);
    }

    private setUserFromToken(token: string){
        const payloadDecoded = new JwtHelperService().decodeToken(token);

        if(payloadDecoded){
            this.me = {
                id: payloadDecoded.sub,
                name: payloadDecoded.name,
                email: payloadDecoded.email
            }
        }else {
            this.me = null;
        }
    }

    loadUserData(): void{
        const token = this.getToken();
        this.setUserFromToken(token);
    }

    isAuth(): boolean{
        const token = this.getToken();

        return ! new JwtHelperService().isTokenExpired(token, 30);
    }

    logout(): Observable<any>{
        return this.http
            .post<{token: string}>(`${environment.api.url}/logout`, {})
            .pipe(
                tap(() => {
                    this.setToken(null);
                })
            );
    }
}
