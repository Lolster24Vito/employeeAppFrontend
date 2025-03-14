import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { provideHttpClient } from '@angular/common/http';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    EmployeeDetailsComponent,
    EmployeeUpdateComponent,
    CreateDepartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
