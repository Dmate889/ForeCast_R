import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  LoginApiEndpointUrl = 'http://localhost:3000/login';
  
  loginUser(username: string, password: string): Observable<any>{
    const body = {username, password};
    return this.http.post(this.LoginApiEndpointUrl, body);
  }

}
