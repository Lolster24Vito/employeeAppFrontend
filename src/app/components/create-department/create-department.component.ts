import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-create-department',
  standalone: false,
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.css'
})
export class CreateDepartmentComponent {
  departmentForm: FormGroup;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router
  ) {
    this.departmentForm = this.fb.group({
      departmentName: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.departmentForm.invalid) {
      return;
    }
    this.departmentService.createDepartment(this.departmentForm.value)
      .subscribe({
        next: (dept) => {
          this.successMessage = 'Department created successfully!';
          this.departmentForm.reset();
          // Optionally navigate to a list of departments
        //  this.router.navigate(['/departments']);
        },
        error: (err) => {
          console.error('Error creating department', err);
        }
      });
  }

}
