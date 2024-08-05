import { Component, inject, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import User, { Permission } from '../../model/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatCheckboxModule, CommonModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent implements OnInit {
onGroupChange(_t14: User,arg1: any) {
throw new Error('Method not implemented.');
}
  userService = inject(UserServiceService);
  users: User[] = [];
  permissions: Permission[] = [];

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (res: User[]) => {
        console.log(res);
        this.users = res;
      },
    });

  this.userService.getPermissions().subscribe({
      next: (res:Permission[]) => {
        console.log(res);
        this.permissions = res;
      }
    });
  }

  onBlockedChange(user: User, value: boolean): void {
    console.log(`Blocked value for ${user.username} changed to ${value}`);
    user.blocked = value;
    this.userService.block(user, value).subscribe({
      next: (res: boolean) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
}

  onApprovedChange(user: User, value: boolean): void {
    console.log(`Approved value for ${user.username} changed to ${value}`);
    user.approved = value;
    this.userService.approve(user, value).subscribe({
      next: (res: boolean) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onActiveChange(user: User, value: boolean): void {
    console.log(`Active value for ${user.username} changed to ${value}`);
    user.approved = value;
  }

  onPermissionChange(user: User, permission: string, value: boolean): void {
    console.log(`User ${user.username} - Permission ${permission} changed to ${value}`);
    const id = this.getPermissionId(permission);
    if (id) {
      if (value) {
        this.userService.addPermision(user.id, id).subscribe({
          next: (res) => {
            console.log(`Permission ${permission} added for user ${user.username}`);
          },
          error: (err) => {
            console.error(`Error adding permission ${permission} for user ${user.username}:`, err);
          }
        });
      } else {
        this.userService.removePermision(user.id, id).subscribe({
          next: (res) => {
            console.log(`Permission ${permission} removed for user ${user.username}`);
          },
          error: (err) => {
            console.error(`Error removing permission ${permission} for user ${user.username}:`, err);
          }
        });
      }
    } else {
      console.error(`Permission ID not found for ${permission}`);
    }
  }

  hasPermission(user: User, permissionName: string): boolean {
    return user.permissions.some(permission => permission.name.toUpperCase() === permissionName.toUpperCase());
  }

  getPermissionId(name: string): number | undefined {
    const permission = this.permissions.find(p => p.name.toUpperCase() === name.toUpperCase());
    return permission ? permission.id : undefined;
  }
}
