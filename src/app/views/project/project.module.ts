import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ProjectComponent } from './project.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectItemComponent } from 'src/app/components/project-item/project-item.component';
import { NgChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectService } from 'src/app/services/ProjectService';
import { SharedService } from 'src/app/services/SharedService';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { GeneralInfoComponent } from 'src/app/components/general-info/general-info.component';
import { BoardComponent } from 'src/app/components/board/board.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    MenuComponent,
    ProjectComponent,
    HeaderComponent,
    DetailComponent,
    ListComponent, 
    ProjectItemComponent, 
    CreateComponent,
    GeneralInfoComponent,
    BoardComponent,
    UserComponent

  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgChartsModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule

  ],
  providers: [
    ProjectService,
    SharedService
  ]
})
export class ProjectModule { }
