import { Priority } from "./Priority";
import { TaskStatus } from "./TaskStatus";

export interface Task {
    id: number;
    projectId: number;
    title: string;
    description: string;
    createdDate: string;
    assignedTo: number | null; 
    status: TaskStatus; 
    priority: Priority; 
  }