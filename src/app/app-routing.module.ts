import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'department/create', component: CreateDepartmentComponent },
  { path: 'employee/:id', component: EmployeeDetailsComponent },
  { path: 'employee/update/:id', component: EmployeeUpdateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
