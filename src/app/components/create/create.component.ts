import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Department } from '../../model/department.model';
import { DepartmentService } from '../../services/department.service';
import { NO_PICTURE_IMAGE_URL } from '../../config/config';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  employeeForm: FormGroup;
  submitted = false;
  successMessage = '';
  selectedFile: File | null = null;
  previewUrl: string = NO_PICTURE_IMAGE_URL;
  departments: Department[] = [];


  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router, private departmentService: DepartmentService) {
    this.employeeForm = this.fb.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      yearOfBirth: [null, [Validators.required, Validators.min(1900)]],
      employmentStartDate: [null], 
      gender: ['', Validators.required],
      annualVacationDaysOff: [14],
      daysOff: [14],
      daysOfPaidLeave: [7],
      departmentId: [null],
       // Employment Contract fields
       contractType: [''],
       contractDurationInMonths: [6],
       contractStart: [null],
    });
  }

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {(this.departments = data);console.log(data)},
      error: (err) => console.error('Error fetching departments', err)
    });
  }


  // Handler for file selection from the file input element
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile != null)
        this.previewUrl = URL.createObjectURL(this.selectedFile);
    }
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    // Create a FormData instance to combine employee fields and the file
    const formData = new FormData();
            //employee

    let employeeData = this.employeeForm.value;
        const employeeJson = JSON.stringify(employeeData);
        const employeeBlob = new Blob([employeeJson], { type: "application/json" });
        formData.append('employee', employeeBlob);
    //department
    employeeData.department = { id: employeeData.departmentId };
    delete employeeData.departmentId; // Remove the temporary field
    //contract 
    const employmentContract = {
      contractType: this.employeeForm.value.contractType,
      contractDurationInMonths: this.employeeForm.value.contractDurationInMonths,
      contractStart: this.employeeForm.value.contractStart,
    };
    const contractJson = JSON.stringify(employmentContract);
    const contractBlob = new Blob([contractJson], { type: "application/json" });
    formData.append('employmentContract', contractBlob);



    // Append the file if one was selected
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.employeeService.createEmployee(formData).subscribe({
      next: (employee) => {
       // this.successMessage = 'Employee created successfully!';
        this.router.navigate(['']);

      },
      error: (err) => {
        console.error('Error creating employee', err);
      }
    });
  }
}