import { Component } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { IMAGE_BASE_URL, NO_PICTURE_IMAGE_URL } from '../../config/config';

@Component({
  selector: 'app-employee-details',
  standalone: false,
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  employee?: Employee;
  imageBaseUrl: string = IMAGE_BASE_URL;
  noPictureUrl:string=NO_PICTURE_IMAGE_URL;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const employeeId = +idParam;
      this.employeeService.getEmployeeById(employeeId).subscribe({
        next: (emp) => {
          this.employee = emp;
          console.log(emp);
        },
        error: (err) => {
          console.error('Error fetching employee details', err);
        }
      });
    }
  }
}
