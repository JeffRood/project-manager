import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ProjectComponent } from './project.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  declarations: [
    MenuComponent,
    ProjectComponent,
    HeaderComponent,
    DetailComponent,
    ListComponent
  ],
  exports: [
    MenuComponent,
    ProjectComponent,
    HeaderComponent,
    DetailComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
