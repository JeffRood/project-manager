import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './project.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: ProjectComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full', },
    {  path: 'list', component: ListComponent },
    {  path: 'create', component: CreateComponent },
    {  path: 'detail/:id', component: DetailComponent },
    {  path: 'user', component: UserComponent },


  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }