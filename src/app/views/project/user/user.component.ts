import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { SharedService } from 'src/app/services/SharedService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];


  formGroup: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private sharedService: SharedService) {
    this.formGroup = this.fb.group({
      name: [''],
      description: [''],
      selectedUsers: ([]) 
    });
  }

  
  ngOnInit(): void {
    this.sharedService.getAllUsers().subscribe(data => {
      this.users = data; 
    });
  }



  
}
