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
import { FormsModule } from '@angular/forms'; 
@NgModule({
  declarations: [
    MenuComponent,
    ProjectComponent,
    HeaderComponent,
    DetailComponent,
    ListComponent, 
    ProjectItemComponent
  ],
  exports: [
    MenuComponent,
    ProjectComponent,
    HeaderComponent,
    DetailComponent,
    ListComponent,
    ProjectItemComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgChartsModule,
    DragDropModule,
    FormsModule
  ]
})
export class ProjectModule { }
