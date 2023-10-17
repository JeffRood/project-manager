import { ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
import { GenericApiService } from './GenericApiService';
import { Observable } from 'rxjs';
import { Priority } from '../models/Priority';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class SharedService{
  

    private statusEndPoint = 'StatusProject';
private userEndPoint = 'users';
private priorityEndPoint = 'priorities';
private rolesEndPoint = 'roles';
constructor(private genericApiService: GenericApiService) {
   



}


  getAllStatus(): Observable<string[]> {
    return this.genericApiService.getAll<string>(`${this.statusEndPoint}`);
  }

  getAllPriority(): Observable<Priority[]> {
    return this.genericApiService.getAll<Priority>(`${this.priorityEndPoint}`);
  }
  getAllRoles(): Observable<string[]> {
    return this.genericApiService.getAll<string>(`${this.rolesEndPoint}`);
  }
  getAllUsers(): Observable<User[]> {
    return this.genericApiService.getAll<User>(`${this.userEndPoint}`);
  }

  createProject(project: User): Observable<User> {
    return this.genericApiService.create<User>(this.userEndPoint, project);
  }
  updateUser(id: number, project: User): Observable<User> {
    return this.genericApiService.update<User>(this.userEndPoint, id, project);
  }

  deleteUser(id: number): Observable<void> {
    return this.genericApiService.delete<User>(this.userEndPoint, id);
  }



  
}
