import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import AccountActivationRequest from '../../model/requests/AccountActivationRequest';
import { AuthService } from '../../services/auth.service';
import { MessageDialogService } from '../../services/message-dialog.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';



@Component({
  selector: 'app-confirm-code',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './confirm-code.component.html',
  styleUrl: './confirm-code.component.css'
})
export class ConfirmCodeComponent {
  private builder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageDialogService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmCodeComponent>
  ) {}

  accountActivateForm: FormGroup = this.builder.group({
    username: new FormControl<string | null>(null, [Validators.required]),
    code: new FormControl<string | null>(null, Validators.required),
  });

  login(): void {
    var request: AccountActivationRequest = { ...this.accountActivateForm.value };
    this.authService.activate(request);
  }
}
