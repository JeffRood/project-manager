import { Injectable } from '@angular/core';
import { GenericApiService } from './GenericApiService';

import { Observable } from 'rxjs';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  
  constructor(private genericApiService: GenericApiService<Project>) {}
  private endPoint = 'projects';

  getAllProjects(): Observable<Project[]> {
    return this.genericApiService.getAll(this.endPoint);
  }

  getProject(id: number): Observable<Project> {
    return this.genericApiService.getOne(this.endPoint, id);
  }

  createProject(project: Project): Observable<Project> {
    return this.genericApiService.create(this.endPoint, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.genericApiService.update(this.endPoint, id, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.genericApiService.delete(this.endPoint, id);
  }
  
}
