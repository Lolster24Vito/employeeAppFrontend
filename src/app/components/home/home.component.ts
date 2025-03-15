import { Component ,OnInit} from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { BASE_URL, IMAGE_BASE_URL, NO_PICTURE_IMAGE_URL } from '../../config/config';
import { EmployeePageDto } from '../../model/dto/employee-page-dto.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public employees: Employee[] = [];
  imageBaseUrl: string = IMAGE_BASE_URL;
  noPictureUrl:string=NO_PICTURE_IMAGE_URL;
  // Pagination variables
  currentPage: number = 0;
  pageSize: number = 4;
  totalPages: number = 0;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }
  loadEmployees(): void {
    this.employeeService.getEmployeesPaginated(this.currentPage, this.pageSize).subscribe({
      next: (dto: EmployeePageDto) => {
        this.employees = dto.employees;
        this.totalPages = dto.totalPages;
        console.log('Employees array after assignment:', this.employees); // Correct placement
        console.log('Employees array:', dto.employees);
        console.log(dto);
      },
      error: (err) => console.error('Error fetching employees', err)
    });
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadEmployees();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEmployees();
    }
  }
}
