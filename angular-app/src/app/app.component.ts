import { Component, OnInit } from '@angular/core';
import pace from 'pace';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-app';

  constructor(public authService: AuthService){}

  ngOnInit(): void{
    pace.start({
      document: false
    });

    this.authService.loadUserData();
  }

  canShowNavBar(): boolean{
    return this.authService.isAuth();
  }
}
