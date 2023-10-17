import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Priority } from 'src/app/models/Priority';
import { Project } from 'src/app/models/Project';
import { Task } from 'src/app/models/Task';
import { User } from 'src/app/models/User';
import { SharedService } from 'src/app/services/SharedService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  @Input() project!: Project;
  @Input() priorityList!: Priority[];
  @Input() memberProjectList!: User[];
  
  @Output() updateData = new EventEmitter<{task:Task, index: number }>();
  @Output() createTask = new EventEmitter<{task:Task}>();
  @Output() deleteTask = new EventEmitter<{taskId:number}>();

  
  form: FormGroup;
  constructor(private fb: FormBuilder, public sharedService :SharedService) {
    
    
    this.form = this.fb.group({
      isEdit: [false],
      id: [0],
      title: ['', Validators.required],
      description: ['', Validators.required],
      createdDate: [new Date().toISOString()], 
      assignedTo: [[]],
      status: [1],
      priority: [1, Validators.required],
    });
  }
  todo: Task[] = [];
  inProgress: Task[] = [];
  Closed: Task[] = [];
  Frozen: Task[] = [];
  isAdmin: boolean = false;
  public userLogged: User| undefined = undefined; 

 ngOnInit(): void {

  const userJSON = localStorage.getItem('username');
  if (userJSON) {
      this.userLogged = JSON.parse(userJSON); 

  } 
  this.isAdmin = this.userLogged?.role == 'admin';


    this.loadData()
    console.log(this.priorityList);
    
 }

 getFullName(assignedTo: any): string | undefined {
  if (assignedTo) {
    const user = this.memberProjectList.find(x => x.id === assignedTo[0]);
    debugger;
    return user?.fullName;
  }
  return 'N/A';
 
}
getPriority(priority: number): string | undefined {
  const Priority = this.priorityList.find(x => x.id === priority);
  return Priority?.name;
}
 loadData() {

  this.project.tasks.map(x => {
    switch (x.status) {
      case 1:
          this.todo.push(x);
        break;
      case 2:
        this.inProgress.push(x);
        break;
      case 3:
        this.Closed.push(x);
        break;
      case 4:
        this.Frozen.push(x);
        break;
      default:
        break;
    }
})
 }

 onTaskDrop(event: CdkDragDrop<any>, ) {
   let position = event.dropPoint;
   debugger;
   if (position.y < 195) {
     return;
    }
    if (position.x < 385) {
      return;
    }

    if (position.x > 1630) {
      return;
    }
    
    let index = 0;
    if (position.x > 388 && position.x < 693) {
      index = 1
    }
    if (position.x > 700 && position.x < 1005) {
      index = 2
    }
    if (position.x > 1010 && position.x < 1315) {
      index = 3
    }
    if (position.x > 1320 && position.x < 1625) {
      index = 4
    }
    let currentList = 'todo';
    let newList = this.todo;
    switch (index) {
      case 1:
        break;
      case 2:
        currentList = 'inprogress';
        newList = this.inProgress;
            break;
       case 3: 
       currentList = 'closed'
       newList = this.Closed;
          break;
       case 4:
        currentList = 'frozen'
        newList = this.Frozen;
            break;
      default:
        break;
    }

   if (event.container.id == currentList) {
      return; 
   }
   
    let list = this.todo;
    switch (event.container.id) {
      case 'todo':
        break;
      case 'inprogress':
            list = this.inProgress
            break;
       case 'closed': 
          list = this.Closed
          break;
       case 'frozen':
          list = this.Frozen
            break;
      default:
        break;
    }

    const task = this.project.tasks.find(x => x.id == list[event.previousIndex].id)
    debugger;
    if (task == undefined) {
      return;
    }
     task.status = index;
      
     this.updateData.emit({task: task, index: this.project.tasks.findIndex(x => x.id == list[event.previousIndex].id)} );
     
      list.splice(event.previousIndex, 1)
      newList.push(task)


}


onSubmit() {
  if (this.form.valid) {
    const newTask = {
      id: this.random(), 
      title: this.form.value.title,
      description: this.form.value.description,
      createdDate: this.form.value.createdDate,
      assignedTo: this.form.value.assignedTo,
      status: this.form.value.status,
      priority: this.form.value.priority,
    };
debugger;
    this.createTask.emit({task: newTask} );
    this.todo.push(newTask)
    this.closeModal();
    this.resetForm();

    Swal.fire(
      'Created!',
      'Your Task has been Created.',
      'success'
    )
  
  }
}

random(min = 1, max = 9999999) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
 }


 deletedTask() {

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      let newList = this.todo;
      switch (this.form.value.priority) {
        case 1:
          break;
        case 2:
          newList = this.inProgress;
              break;
         case 3: 
         newList = this.Closed;
            break;
         case 4:
          newList = this.Frozen;
              break;
        default:
          break;
      }
      const taskIndex = newList.findIndex(x => x.id == this.form.value.id);
      this.deleteTask.emit({taskId: this.form.value.id } );
      newList.splice(taskIndex, 1);
      this.closeModal();
      this.resetForm();
      Swal.fire(
        'Deleted!',
        'Your Task has been deleted.',
        'success'
      )
    }
  })
  
 }

 callUpdateTask() {

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Update it!'
  }).then((result) => {
    if (result.isConfirmed) {
      let newList = this.todo;
      switch (this.form.value.priority) {
        case 1:
          break;
        case 2:
          newList = this.inProgress;
              break;
         case 3: 
         newList = this.Closed;
            break;
         case 4:
          newList = this.Frozen;
              break;
        default:
          break;
      }
      const taskIndex = newList.findIndex(x => x.id == this.form.value.id);
      const updateTask = {
        id: this.form.value.id, 
        title: this.form.value.title,
        description: this.form.value.description,
        createdDate: this.form.value.createdDate,
        assignedTo: this.form.value.assignedTo,
        status: this.form.value.status,
        priority: this.form.value.priority,
      };
        newList[taskIndex] = updateTask;
      this.updateData.emit({task: updateTask, index: taskIndex});
      this.closeModal();  
     this.resetForm();

      Swal.fire(
        'Deleted!',
        'Your Task has been Updated.',
        'success'
      )
    }
  })
}

resetForm() {
  this.form.reset();
  const newValues = {
    isEdit: false,
    createdDate: new Date().toISOString(), 
    status: 1
  };
  this.form.patchValue(newValues);
}

 pressToEdit(task: Task) {

  const newValues = {
    isEdit: true,
    id: task.id,
    title: task.title,
    description: task.description,
    createdDate: task.createdDate, 
    assignedTo: task.assignedTo,
    status: task.status,
    priority: task.priority,
  };

  this.form.patchValue(newValues);
  this.openModal(false)

 }



 openModal(reset = true) {
  if (reset) {
    this.resetForm();
  }
  const bottom = document.getElementById('openModal');
 if (bottom) {
      bottom.click();
    } 
 }

 closeModal() {
  const bottom = document.getElementById('closeModal');
  this.resetForm();
 if (bottom) {
      bottom.click();
    } 
 }
 
}
