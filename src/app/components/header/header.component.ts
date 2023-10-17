import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router) {}
  isAdmin: boolean = false;
  public userLogged: User| undefined = undefined; 

  ngOnInit(): void {
    const userJSON = localStorage.getItem('username');
    if (userJSON) {
        this.userLogged = JSON.parse(userJSON); 
  
    } 
    this.isAdmin = this.userLogged?.role == 'admin';
  
  }
   singOut() {

    localStorage.removeItem('username');
    this.router.navigate([`/login`]); 

   }

}
