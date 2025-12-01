import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { UserApiService } from '../../services/userApi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  studentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userApiService: UserApiService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.createUserForm();
  }

  createUserForm() {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isAdmin: [false]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      this.userApiService.register(formData).subscribe(
        (response) => {
          this.router.navigate(['/']);
        },
        (error) => {
          let errorMessage = 'Registration failed:';
          if (error.status === 409) {
            errorMessage = 'Registration failed: User already exists';
          } else if (error.status === 500) {
            errorMessage = 'Registration failed: An error occurred while creating the user';
          } else {
            errorMessage = `Registration failed: ${error.message}`;
          }
          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
          });
        }
      );
    } else {
      console.log('Form is invalid.');
    }
  }

  goToLogin() {
    this.router.navigate(['/']);
  }

}
