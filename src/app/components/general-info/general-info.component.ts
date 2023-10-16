import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent  implements OnInit{

  @Input() project!: Project;
  @Input() status: String = '';
  @Input() createBy: User | null = null;
  @Input() memberProject:  User[] = [];

  membersStrings = ''
  ngOnInit(): void {
   this.membersStrings =  this.memberProject.map(participant => participant.username).join(', ') 
  }

}
