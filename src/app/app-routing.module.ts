import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'project',
    loadChildren: () => import('./views/project/project.module')
      .then(mod => mod.ProjectModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'    
})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }