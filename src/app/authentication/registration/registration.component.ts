import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import RegistrationRequest from '../../model/requests/RegistrationRequest';
import User from '../../model/User';
import { AuthService } from '../../services/auth.service';
import { MessageDialogService } from '../../services/message-dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MatCard, MatIcon, MatInputModule, MatCardTitle, MatCardModule, MatCardContent, CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  private builder = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageDialogService);

    registerForm: FormGroup = this.builder.group({
    username: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
    password: new FormControl<string | null >(null, [Validators.required, Validators.minLength(8)]),
    email: new FormControl<string|null>(null, [Validators.required, Validators.email]),
    role: new FormControl<string|null>(null, Validators.required),
  });

  register() {
    var request: RegistrationRequest = { ...this.registerForm.value };
    console.log(request);
    this.authService.register(request).subscribe({
      next: (user: User) => {
        console.log('Successfully sent registration', user);
        this.messageService.showMessageDialog('Activate account', 'You will get email when your account becomes active');
      }
    });
  }  

}
