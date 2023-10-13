import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './project.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ProjectComponent, children: [
    {  path: '', component: ListComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }