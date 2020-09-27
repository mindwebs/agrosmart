import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface myData {
  success: boolean,
  message: string,
  userName: String,
  loginHash: string
}

interface userData {
  name: String,
  email: String,
  username: String,
  accessLevel: String,
  phone: String,
  lastLogin: String,
  loginHash: String
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedInStatus = false;
  private name: any;
  private email: any;

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean, nameU, emailU) {
    this.loggedInStatus = value;
    this.name = nameU;    
    this.email = emailU;
  }

  getUserName() {
    return this.name;
  }
  getUserEmail() {
    return this.email;
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  getUserDetails(username, password) {
    // post these details to API server return user info if correct
    return this.http.post<myData>(environment.api + '/user/login', {
      username,
      password
    })
  }

  getUser(email) {
    return this.http.get<userData>(environment.api + '/user/'+email)
  }
}
