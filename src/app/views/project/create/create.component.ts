import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/services/ProjectService';
import { SharedService } from 'src/app/services/SharedService';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  selectedUsers: any[] = [];
  users: User[] = []; 

  createForm: FormGroup;

  dropdownSettings = {
    singleSelection: false, 
    idField: 'id', 
    textField: 'username', 
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3, 
    allowSearchFilter: true
  };

  constructor(private router: Router, private fb: FormBuilder, private sharedService: SharedService, private projectService: ProjectService) {
    this.createForm = this.fb.group({
      name: [''],
      description: [''],
      selectedUsers: ([]) 
    });
  }

  ngOnInit(): void {
    this.sharedService.getAllUsers().subscribe(data => {
      debugger;
      this.users = data; 
    });
  }

  onSubmit() {
    if (this.createForm.valid) {
      const fechaActual = new Date();

      const proyecto = {
        name: this.createForm.value.name,
        description: this.createForm.value.description,
        createdDate: fechaActual.toISOString(),
        access:  [1],
        id: this.random(), 
        createdBy: 1,
        status: 1,
        tasks: [] 
      };
 
     this.projectService.createProject(proyecto).subscribe(x => {
      this.router.navigate([`/project/detail/${x.id}`]);
     })

    }

  }

   random(min = 1, max = 9999999) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
   }


}
