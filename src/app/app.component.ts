import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'projectManajer';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');

    if (username) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/project']);
    }
  }
}
