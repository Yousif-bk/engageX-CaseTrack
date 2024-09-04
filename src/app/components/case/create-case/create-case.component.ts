import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  standalone: true
})
export class CreateCaseComponent implements OnInit {
  createCaseForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
  ) {
  }


  uiState = {
    isLoading: false,
    isSubmitting: false,
    isAlertVisible: false,
    errorMessage: '',
    successMessage: '',
    isSuccess: false,
    isFormVisual: false,
    isDisabled: true,
    locaionErrorMessage: ''
  }

  ngOnInit(): void {
    this.initeForm();
  }

  initeForm() {
    const username = localStorage.getItem('username')
    this.createCaseForm = this.formBuilder.group({
      username: [username, Validators.required],
      subject: ['', Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
    })
  }

  createCase() {
    this.uiState.isSubmitting = true
    this.uiState.isLoading = true
    if (this.createCaseForm.invalid) {
      this.uiState.isLoading = false
      return
    }
    this.appService.createCaseRequesr(this.createCaseForm.value).subscribe(
      {
        next: (res) => {
          this.uiState.isLoading = false,
            this.router.navigate(['case/list'])
        },
        error: (error) => {
          this.uiState.isLoading = false,
            setTimeout(() => {
            }, 4000);
        }
      }
    )
  }
}
