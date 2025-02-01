import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { UserApiService } from '../../services/userApi.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private userApiService: UserApiService,
    private router: Router
  ) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.LoginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      const { username, password } = this.LoginForm.value;
      this.userApiService.login(username, password).subscribe(
        (user) => {
          console.log('Login successful:', user);
          // Navigate to another page or perform other actions upon successful login
          this.router.navigate(['/movies']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    } else {
      console.log('Form is invalid.');
    }
  }

}
