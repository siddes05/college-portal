import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { DepartmentsComponent } from './departments/departments.component';
import {HttpClientModule} from '@angular/common/http';
import { StudentsService } from './students.service';
import { DepartmentsService } from './departments.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    DepartmentsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StudentsService,DepartmentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
