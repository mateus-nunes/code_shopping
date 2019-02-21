import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  };

  showMessageError = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.http.post<any>('http://localhost:8000/api/login', this.credentials)
        .subscribe((data) =>{
              window.localStorage.setItem('token',data.token);

              this.router.navigate(['categories/list']);
            },
            (error) =>  this.showMessageError = true
        );
    return false;
  }
}
