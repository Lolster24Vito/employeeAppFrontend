import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee.model';
import { Observable } from 'rxjs';
import { BASE_URL } from '../config/config';
import { EmployeePageDto } from '../model/dto/employee-page-dto.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = BASE_URL+'employees';

 
  constructor(private http: HttpClient) {}

  createEmployee(employeeData: FormData): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employeeData);
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
  getEmployeesPaginated(page: number, size: number): Observable<EmployeePageDto> {
    return this.http.get<EmployeePageDto>(`${BASE_URL}employeesPage?page=${page}&size=${size}`);
  }
  
  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`);
  }
  updateEmployee(id:number,employeeData: FormData): Observable<Employee> {
    return this.http.put<Employee>(this.apiUrl+"/"+id, employeeData);
  }
}
