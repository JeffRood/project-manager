import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/ProjectService';
import { SharedService } from 'src/app/services/SharedService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private router: Router, private projectService: ProjectService, private sharedService :SharedService) 
  {

  }
  listProject: Project[] = [];
  projectActives: number = 0;
  projectCompleted: number = 0 
  status: String[] = [];

  ngOnInit(): void {
    this.loadData();
  }
  navigateToProject(projectId: number) {
    this.router.navigate([`/project/detail/${projectId}`]);
    
  }

  createProject() {
    this.router.navigate([`/project/create`]);
    
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
      this.projectActives = data.filter(x => x.status == 1).length;
      this.projectCompleted = data.filter(x => x.status == 2).length;
    });
    this.sharedService.getAllStatus().subscribe(data => {
      this.status = data;
    });
  }
}
