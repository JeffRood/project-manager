import { Task } from "./Task";
import { User } from "./User";

export interface Project {
    id: number;
    name: string;
    description: string;
    createdBy: number; 
    access: number[]; 
    createdDate: string; 
    status: number
    tasks: Task[];
  }
  