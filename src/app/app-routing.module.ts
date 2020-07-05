import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskmanagerListComponent } from './taskmanager-list/taskmanager-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'taskmanagerlist', pathMatch: 'full' },
  { path: 'taskmanagerlist', component: TaskmanagerListComponent },
  { path: '**', redirectTo: 'taskmanagerlist' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
