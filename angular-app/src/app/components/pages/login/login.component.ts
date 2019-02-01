import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

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

  token: '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submit() {
    this.http.post('http://localhost:8000/api/login', this.credentials)
        .subscribe((data) =>{
          console.log(data);
          this.token = data.token;
        });
    return false;
  }
}
