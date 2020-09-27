import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public uname: any;
  public email: any;

  constructor(private authService: AuthService) { 
    this.uname = sessionStorage.getItem('username');
    this.email = sessionStorage.getItem('email');
  }

  ngOnInit() {
  }

}
