import { Injectable } from '@angular/core';
import { GenericApiService } from './GenericApiService';

import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  
  constructor(private genericApiService: GenericApiService) {}
  private endPoint = 'projects';

  getAllProjects(): Observable<Project[]> {
    return this.genericApiService.getAll<Project>(this.endPoint);
  }


  getProject(id: number): Observable<Project> {
    return this.genericApiService.getOne<Project>(this.endPoint, id);
  }

  createProject(project: Project): Observable<Project> {
    return this.genericApiService.create<Project>(this.endPoint, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.genericApiService.update<Project>(this.endPoint, id, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.genericApiService.delete<Project>(this.endPoint, id);
  }
  
}
