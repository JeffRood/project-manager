import { Injectable } from '@angular/core';
import { GenericApiService } from './GenericApiService';
import { Observable } from 'rxjs';
import { Role } from '../models/Role';
import { Priority } from '../models/Priority';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  
constructor(private genericApiService: GenericApiService) {}
private statusEndPoint = 'StatusProject';
private userEndPoint = 'users';
private priorityEndPoint = 'priorities';



  getAllStatus(): Observable<string[]> {
    return this.genericApiService.getAll<string>(`${this.statusEndPoint}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.genericApiService.getAll<User>(`${this.userEndPoint}`);
  }
  getAllPriority(): Observable<Priority[]> {
    return this.genericApiService.getAll<Priority>(`${this.priorityEndPoint}`);
  }


  
}
