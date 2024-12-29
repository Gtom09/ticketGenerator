import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rates',
  standalone: true,
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RatesComponent {
  idCardForm: FormGroup;
  photoURL: string | ArrayBuffer | null = null;
  idCardGenerated = false;
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+'];

  @ViewChild('idCard') idCard!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.idCardForm = this.fb.group({
      name: ['', Validators.required],
      photo: [null, Validators.required],
      bloodGroup: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoURL = reader.result;
        this.idCardForm.patchValue({ photo: file });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.idCardForm.valid) {
      this.idCardGenerated = true;
    } else {
      alert('Please fill in all required fields.');
    }
  }

  printIDCard(): void {
    const printContent = this.idCard.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore the original content
  }
}