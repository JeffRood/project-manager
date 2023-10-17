import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { SharedService } from 'src/app/services/SharedService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  Roles: string[] = [];

  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private sharedService: SharedService) {
    this.form = this.fb.group({
      isEdit: [false],
      id: [0],
      fullName: ['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      role: [''],
      password: ['']
    });
  }
  
  ngOnInit(): void {
    this.loadUser();
    this.loadRoles();
  }




  pressToEdit(user: User) {

    const newValues = {
      isEdit: true,
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      password: user.password
    };
  
    this.form.patchValue(newValues);
    this.openModal(false)
  
   }
  
   onSubmit() {

    const newValues = {
      id: this.random(),
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      role: this.form.value.role,
      password: this.form.value.password
    };

    this.sharedService.createProject(newValues).subscribe(x => {
      Swal.fire({
        icon:'success',
        title: 'User Created',
        showConfirmButton: false,
        timer: 1500
        })
        this.loadUser();
        this.form.reset();
        this.closeModal(); 
    })



   }


   random(min = 1, max = 9999999) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
   }
  updateUser() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const taskIndex = this.users.findIndex(x => x.id == this.form.value.id);

        const newValues = {
          id: this.form.value.id,
          fullName: this.form.value.fullName,
          email: this.form.value.email,
          role: this.form.value.role,
          password: this.form.value.password
        };
          this.users[taskIndex] = newValues;
        this.sharedService.updateUser(this.form.value.id, newValues);
        this.closeModal();  
        this.form.reset();
        Swal.fire(
          'Updated!',
          'Your User has been Updated.',
          'success'
        )
      }
    })
     
  }

  deletedUser() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sharedService.deleteUser(this.form.value.id).subscribe(x => x)   
        const index = this.users.findIndex(x => x.id == this.form.value.id);
        this.users.splice(index, 1);
        this.closeModal();
        this.form.reset();
        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        )
      }
    })


  }

  loadRoles() {
    this.sharedService.getAllRoles().subscribe(data => {
      this.Roles = data; 
    });
  }
  loadUser() {
    this.sharedService.getAllUsers().subscribe(data => {
      this.users = data; 
    });
  }


 openModal(reset = true) {
  if (reset) {
    this.form.reset();
  }
  const bottom = document.getElementById('openModal');
 if (bottom) {
      bottom.click();
    } 
 }

 closeModal() {
  const bottom = document.getElementById('closeModal');
  this.form.reset();
 if (bottom) {
      bottom.click();
    } 
 }

  
}
