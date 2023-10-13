import { Role } from './Role';

export interface User {
    id: number;
    username: string;
    email: string;
    fullName: string;
    role: Role;
    password: string; 
  }
  



