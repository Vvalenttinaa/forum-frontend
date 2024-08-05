import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import LoginRequest from '../../model/requests/LoginRequest';
import LoginResponse from '../../model/responses/LoginResponse';
import { ConfirmCodeComponent } from '../../components/confirm-code/confirm-code.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    MatFormField,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private builder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  mess: string = '';

  loginForm: FormGroup = this.builder.group({
    username: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, Validators.required),
  });

  login(): void {
    var request: LoginRequest = { ...this.loginForm.value };
    this.authService.login(request).subscribe({
      next: (res: LoginResponse) => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userId', res.user.id.toString());
        console.log(res.role.name);
        console.log('Token ', this.authService.decodeToken());
        if(res.role.name == 'admin'){
          console.log(true);
          this.router.navigate(['users']);
        }else if(res.role.name == 'moderator'){
          this.router.navigate(['approvments']);
        }
        else if (!res.user.active) {
          const dialogRef = this.dialog.open(ConfirmCodeComponent, {
            width: '50%',
            disableClose: false,
          });
         }
         else {
          console.log('User logged in:', res.user);
          this.router.navigate(['']).then(() => {});
        }
      },
      error: (err) =>{
        console.log("Wrong creds");
        this.mess = "wRONG";
      }
    });
  }
}
