import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { User } from 'src/app/models/User';
import { SharedService } from 'src/app/services/SharedService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  
  isAdmin: boolean = false;
  public userLogged: User| undefined = undefined; 
  constructor(private router: Router, public sharedService: SharedService ) {
  }

  ngOnInit(): void {
    const userJSON = localStorage.getItem('username');
    if (userJSON) {
        this.userLogged = JSON.parse(userJSON); 
  
    } 
    this.isAdmin = this.userLogged?.role == 'admin';
  
  }

  navigateToProject(url: string) {
    this.router.navigate([`${url}`]);
    
  }
}
