import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { SharedService } from 'src/app/services/SharedService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, private sharedService :SharedService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  users: User[] = []

  ngOnInit(): void {
    const username = localStorage.getItem('username');

    if (username) {
      this.router.navigate(['/project']);
    } else {
      this.router.navigate(['/login']);
    }
      this.sharedService.getAllUsers().subscribe(x => {
        this.users= x;
      })
  }

  
handleSubmit() {
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;
  const user = this.users.find((u) => u.email === email);
  if (user && user.password === password) {

    localStorage.setItem('username', JSON.stringify(user));
    this.router.navigate([`/project/list`]); 
  } else {
    Swal.fire(
      'Error!',
      'please check your credencials.',
      'error'
    )
    
  }
}


}
