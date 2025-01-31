import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  studentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createStudentForm();
  }

  createStudentForm() {
    this.studentForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      console.log('Form Submitted:');
      for (const [key, value] of Object.entries(formData)) {
        console.log(`${key}: ${value}`);
      }
    } else {
      console.log('Form is invalid.');
    }
  }

  goToLogin() {
    this.router.navigate(['/']);
  }

}
