import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class LoginComponent implements OnInit {
  uiState = {
    isLoading: false,
    isSubmitting: false,
    isAlertVisible: false,
    errorMessage: ''
  }
  // Forms
  signInFormGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initeForm()
  }

  // inite Form
  initeForm() {
    this.signInFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
      password: [null, [Validators.required]]
    })
  }

  signIn() {
    this.uiState.isSubmitting = true
    this.uiState.isLoading = true
    if (this.signInFormGroup.invalid) {
      this.uiState.isLoading = false
      return
    }
    this.authService.signIn(this.signInFormGroup.value).subscribe(
      {
        next: (res) => { this.uiState.isLoading = false },
        error: (error) => {
          console.log(error, "error");

          this.uiState.isAlertVisible = true,
            this.uiState.isLoading = false,
            this.uiState.errorMessage = error.error.responseMessage
          setTimeout(() => {
            this.uiState.isAlertVisible = false
          }, 2000);
        }
      }
    )
  }
}
