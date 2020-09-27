import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    if (sessionStorage.getItem('loginHash')) {
      this.router.navigate([''])
    }
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    this.Auth.getUserDetails(username, password).subscribe(data => {
      if (data.success) {
        this.Auth.getUser(username).subscribe(userData => {
          const name = userData.name.valueOf();
          const loginHash = userData.loginHash.valueOf();
          sessionStorage.setItem('username', name);
          sessionStorage.setItem('email', username);

          const dateNow = new Date();
          dateNow.setDate(dateNow.getDate() + 30);
          this.cookieService.delete('user_email');
          this.cookieService.set('user_email', username, dateNow);

          sessionStorage.setItem('loginHash', loginHash);
          this.Auth.setLoggedIn(true, name, username);
          console.log(username + " was logged in!", name);
        })

        if (sessionStorage.getItem('loginHash')) {
          this.router.navigate([''])
        }

        if (!this.cookieService.get('propertyId')) {
          this.router.navigate(['/setup/selectProperty'])
        }

      } else {
        window.alert(data.message)
        console.log(username, password)
      }
    })
  }
}
