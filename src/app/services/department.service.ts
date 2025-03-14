import { Injectable } from '@angular/core';
import { BASE_URL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = BASE_URL + 'departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }
  
  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

}
