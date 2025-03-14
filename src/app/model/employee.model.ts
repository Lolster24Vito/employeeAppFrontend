import { Department } from "./department.model";
import { EmploymentContract } from "./employment-contract.model";

export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    yearOfBirth: number;
    employmentStartDate?: Date;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    imagePath?:string;
    annualVacationDaysOff?: number;
    daysOff?: number;
    daysOfPaidLeave?: number;
    department?: Department;            // nested department
    employmentContracts?: EmploymentContract[]; // nested contracts
  }