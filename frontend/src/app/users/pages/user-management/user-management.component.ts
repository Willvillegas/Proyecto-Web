import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../services/userApi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(
    private userApiService: UserApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userApiService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.snackBar.open('Failed to load users', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  toggleAdmin(user: any): void {
    user.isAdmin = !user.isAdmin;
    this.userApiService.updateUser(user).subscribe(
      () => {
        this.snackBar.open('User updated successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('Failed to update user', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}