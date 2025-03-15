import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { Employee } from '../../model/employee.model';
import { Department } from '../../model/department.model';
import { EmploymentContract } from '../../model/employment-contract.model';
import { IMAGE_BASE_URL, NO_PICTURE_IMAGE_URL } from '../../config/config';

@Component({
  selector: 'app-employee-update',
  standalone: false,
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent implements OnInit{
  employeeForm: FormGroup;
  employeeId: number | null = null;
  selectedFile: File | null = null;
  previewUrl: string = NO_PICTURE_IMAGE_URL;
  departments: Department[] = [];
  

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      yearOfBirth: [null, [Validators.required, Validators.min(1900)]],
      employmentStartDate: [null],
      gender: ['', Validators.required],
      annualVacationDaysOff: [14],
      daysOff: [14],
      daysOfPaidLeave: [7],
      departmentId: [null],
      employmentContracts: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe((employee) => {
        this.populateForm(employee);
      });
    }
    this.departmentService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  populateForm(employee: Employee): void {
    this.employeeForm.patchValue({
      ...employee,
      departmentId: employee.department?.id
    });
    if(employee.imagePath){
    this.previewUrl = IMAGE_BASE_URL+employee.imagePath;
    }
    employee.employmentContracts?.forEach(contract => this.addExistingContract(contract));
  }

  get contracts(): FormArray {
    return this.employeeForm.get('employmentContracts') as FormArray;
  }
  addContract(): void {
    this.contracts.push(this.fb.group({
      contractType: ['', Validators.required],
      contractDurationInMonths: [null],
      contractStart: [null, Validators.required]
    }));
  }

  addExistingContract(contract: EmploymentContract): void {
    this.contracts.push(this.fb.group({
      contractType: [contract.contractType, Validators.required],
      contractDurationInMonths: [contract.contractDurationInMonths, Validators.required],
      contractStart: [contract.contractStart, Validators.required]
    }));
  }

  removeContract(index: number): void {
    this.contracts.removeAt(index);
  }
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if(this.selectedFile)
      this.previewUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.invalid){ 
      console.log('invalid');
      return;
    
    }
    const formData = new FormData();
    const employeeData = this.employeeForm.value;
    employeeData.department = { id: employeeData.departmentId };
    delete employeeData.departmentId;
    const employeeJson = JSON.stringify(employeeData);
    formData.append('employee', new Blob([employeeJson], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    this.employeeService.updateEmployee(this.employeeId!,formData).subscribe(() => {
      this.router.navigate(['/employee', this.employeeId]);
    });
  }
}
