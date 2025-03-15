import { Employee } from "../employee.model";

export interface EmployeePageDto {
    employees: Employee[];
    totalPages: number;
    currentPage: number;
  }