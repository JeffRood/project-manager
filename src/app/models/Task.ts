import { Priority } from "./Priority";
import { TaskStatus } from "./TaskStatus";

export interface Task {
    id: number;
    title: string;
    description: string;
    createdDate: string;
    assignedTo: number | null; 
    status: number; 
    priority: number; 
  }