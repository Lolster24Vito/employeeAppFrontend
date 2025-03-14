import { Component ,OnInit} from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { BASE_URL, IMAGE_BASE_URL, NO_PICTURE_IMAGE_URL } from '../../config/config';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public employees: Employee[] = [];
  imageBaseUrl: string = IMAGE_BASE_URL;
  noPictureUrl:string=NO_PICTURE_IMAGE_URL;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {this.employees = data;console.log(data)},
      error: (err) => console.error('Error fetching employees', err)
    });
  }
}
