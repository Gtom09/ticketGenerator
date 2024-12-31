import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
   
})
export class PolicyComponent implements OnInit {
goBack() {
 this.router.navigate(['/dashboard']);
}

  policyForm!: FormGroup;
  policyData: any;
  categoryData: any;
  completePolicyData: any;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.policyForm = this.fb.group({
      ticketNumber: ['', Validators.required],
      clientName: ['', Validators.required],
      ticketStatus:['OPEN', Validators.required],
      caseRaiseDate: ['', Validators.required],
      ackDate: ['', Validators.required],
      reportedBy: ['', Validators.required],
      clientEmail: ['', Validators.required],
      clientPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      projectReference: ['', Validators.required],
      deviceModel: ['', Validators.required],
      deviceSl:['', Validators.required],
      deviceDescription: ['', Validators.required],
      lconName: ['', Validators.required],
      siteContact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      siteAddress: ['', Validators.required],
      caseDescription: ['', Validators.required],
    });

    this.policyData = history.state.policyData;
    if (this.policyData) {
      this.policyForm.patchValue(this.policyData);
    }
    this.categoryData = history.state.categoryData;

    interval(30000).subscribe(() => {
      this.autoSave();
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.policyForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.policyForm.valid) {
      this.isLoading = true
      this.http.post('http://localhost:8080/discount/save', this.policyForm.value).subscribe(
        response => {
          alert("NEW TICKET GENERATED");
          this.router.navigate(['/category']);
        },
        error => {
          console.error('Error saving ticket', error);
        }
      );
    } else {
      this.policyForm.markAllAsTouched();

      const invalidFields: string[] = [];
      Object.keys(this.policyForm.controls).forEach((field) => {
        const control = this.policyForm.get(field);
        if (control?.invalid) {
          invalidFields.push(field);
        }
      });
    }
  }

  autoSave(): void {
    localStorage.setItem('policyData', JSON.stringify(this.policyForm.value));
  }
}