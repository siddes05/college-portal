import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { DepartmentsComponent } from './departments/departments.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {
    path: "students",
    component: StudentsComponent
  },
  {
    path: "departments",
    component: DepartmentsComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  { path: '**', 
  component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
