import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  LoginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createStudentForm();
  }

  createStudentForm() {
    this.LoginForm = this.formBuilder.group({
      firstName: ['Natasha', Validators.required],
      lastName: ['Calderón'],
      email: ['natashacalderon@gmail.com', [Validators.required, Validators.email]],
      phone: ['86298303', Validators.required],
      preferredContactMethod: [''],
      message: ['Listo el LAB09']
    });
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      const formData = this.LoginForm.value;
      console.log('Form Submitted:');
      for (const [key, value] of Object.entries(formData)) {
        console.log(`${key}: ${value}`);
      }
    } else {
      console.log('Form is invalid.');
    }
  }

}
