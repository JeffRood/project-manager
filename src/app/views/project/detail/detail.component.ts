import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProjectService } from 'src/app/services/ProjectService';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { SharedService } from 'src/app/services/SharedService';
import { User } from 'src/app/models/User';
import { forkJoin } from 'rxjs';
import { Task } from 'src/app/models/Task';
import { Priority } from 'src/app/models/Priority';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit  {
   project: Project | null = null;
   status: String[] = [];
   UserList: User[] = [];
   createBy: User | null = null
   memberProject: User[] = []
   priority: Priority[] = [];


   isInGeneral = true;
    constructor(private projectService: ProjectService, private route: ActivatedRoute, private sharedService :SharedService) {}
       
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const idParam = params.get('id');
        if (idParam !== null) {
          const id = +idParam;
          this.loadData(id)
        }
      });
    }

    async loadData(projectId: number) {
    
    
      forkJoin({
        project: this.projectService.getProject(projectId),
        status: this.sharedService.getAllStatus(),
        users: this.sharedService.getAllUsers(),
        priority: this.sharedService.getAllPriority()
      }).subscribe(data => {
        this.project = data.project;
        this.status = data.status;
        this.UserList = data.users;
        this.priority = data.priority;
        this.createBy = this.UserList.find(x => x.id == this.project?.createdBy) as User;
        this.memberProject = this.UserList.filter(x => this.project?.access.includes(x.id));
      });
    
      }
      
    
    tabGeneral(selection: number) {
      if ((selection == 1 && this.isInGeneral) || (selection == 2 && !this.isInGeneral)) {
        return
      }
      this.isInGeneral = !this.isInGeneral
    }

    updateStatusTask(data: { task: Task, index: number }) {
       debugger;
       
        this.project!.tasks[data.index] = data.task;

        this.projectService.updateProject(this.project!.id, this.project!).subscribe(x => x)
        this.loadData(this.project!.id);
       
    }


    createTask(data: { task: Task }) {
       this.project!.tasks.push(data.task);
       this.projectService.updateProject(this.project!.id, this.project!).subscribe(x => x)
       this.loadData(this.project!.id);
      
   }


}
