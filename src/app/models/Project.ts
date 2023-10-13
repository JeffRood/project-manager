import { User } from "./User";

export interface Project {
    id: number;
    name: string;
    description: string;
    createdBy: User; 
    access: User[]; 
    createdDate: string; 
  }
  