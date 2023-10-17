import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/services/ProjectService';
import { SharedService } from 'src/app/services/SharedService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private router: Router, private projectService: ProjectService, private sharedService :SharedService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: [''] 
    });
    this.searchForm.get('searchTerm')!.valueChanges.subscribe(searchTerm => {
      this.onSearch(searchTerm);
    });
  }
  listProject: Project[] = [];
  projects: Project[] = [];
  projectActives: number = 0;
  projectCompleted: number = 0 
  status: String[] = [];
  searchTerm: string = '';
  isAdmin: boolean = false;
  public userLogged: User| undefined = undefined; 

  ngOnInit(): void {
    this.loadData();
    
  const userJSON = localStorage.getItem('username');
  if (userJSON) {
      this.userLogged = JSON.parse(userJSON); 

  } 
  this.isAdmin = this.userLogged?.role == 'admin';

  
  }
  navigateToProject(projectId: number) {
    this.router.navigate([`/project/detail/${projectId}`]); 
  }

  createProject() {
    this.router.navigate([`/project/create`]);
  }


  onSearch(term: string) {
    if (term) {
      term = term.toLowerCase(); 
      this.listProject = this.projects.filter(x =>
        x.description.toLowerCase().includes(term) || x.name.toLowerCase().includes(term)
      );
    } else {
      this.listProject = this.projects;
    }
  }
  

  goToCreateProject() {
    Swal.fire({
      title: 'Do you wish create a new project?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, i don`t want',
    }).then((result) => {
      if (result.value) {
        this.router.navigate([`/project/create`]);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Is okey', 'return to create project when you fell ready.)', 'info');
      }
    });
  }

  loadData() {
    this.projectService.getAllProjects().subscribe(data => {
      this.listProject = data.filter(x => x.status != 0);
      this.projects = data.filter(x => x.status != 0);
      this.projectActives = data.filter(x => x.status == 1).length;
      this.projectCompleted = data.filter(x => x.status == 2).length;
    });
    this.sharedService.getAllStatus().subscribe(data => {
      this.status = data;
    });
  }
}
