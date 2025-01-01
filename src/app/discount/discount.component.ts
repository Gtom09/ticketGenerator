import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-discount',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  discountForm!: FormGroup;
  ticketNumber!: string;
  isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe(params => {
      this.ticketNumber = params['ticketNumber'];
      this.fetchTicketDetails(this.ticketNumber);
      
    });

    this.discountForm.get('noOfEngineer')?.valueChanges.subscribe(value => {
      this.updateFormArray(this.engineers, +value, this.createEngineerGroup.bind(this));
    });

    this.discountForm.get('noOfPart')?.valueChanges.subscribe(value => {
      this.updateFormArray(this.parts, +value, this.createPartGroup.bind(this));
    });
  }

  initializeForm(): void {
    this.discountForm = this.fb.group({
      ticketNumber: [{ value: '', disabled: true }],
      clientName: [{ value: '', disabled: true }],
      ticketStatus: [{ value: '', disabled: true }],
      caseRaiseDate: [{ value: '', disabled: true }],
      ackDate: [{ value: '', disabled: true }],
      reportedBy: [{ value: '', disabled: true }],
      clientEmail: [{ value: '', disabled: true }],
      clientPhone: [{ value: '', disabled: true }],
      projectReference: [{ value: '', disabled: true }],
      deviceModel: [{ value: '', disabled: true }],
      deviceSl: [{ value: '', disabled: true }],
      deviceDescription: [{ value: '', disabled: true }],
      lconName: [{ value: '', disabled: true }],
      siteContact: [{ value: '', disabled: true }],
      siteAddress: [{ value: '', disabled: true }],
      caseDescription: [{ value: '', disabled: true }],
      noOfPart: ['', Validators.required],
      parts: this.fb.array([]),
      providerName: ['', Validators.required],
      noOfEngineer: ['', Validators.required],
      engineers: this.fb.array([]),
      remark: ['', Validators.required],
      svr: ['', Validators.required],
      deliveryChallen: ['', Validators.required],
      casePic: ['', Validators.required]
    });
  }

  get engineers(): FormArray {
    return this.discountForm.get('engineers') as FormArray;
  }

  get parts(): FormArray {
    return this.discountForm.get('parts') as FormArray;
  }

  fetchTicketDetails(ticketNumber: string): void {
    this.http.get<any>(`${environment.apiUrl}/discount/fetch/${ticketNumber}`).subscribe(
      (data) => {
        console.log('Fetched ticket details:', data);
        this.discountForm.patchValue(data);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching ticket details', error);
      }
    );
  }

  isInvalid(controlName: string, formGroup: FormGroup | FormArray = this.discountForm): boolean {
    const control = formGroup.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  updateFormArray(formArray: FormArray, count: number, createGroupFn: () => FormGroup): void {
    while (formArray.length < count) {
      formArray.push(createGroupFn());
    }
    while (formArray.length > count) {
      formArray.removeAt(formArray.length - 1);
    }
  }

  createEngineerGroup(): FormGroup {
    return this.fb.group({
      engineerName: ['', Validators.required],
      engineerNumber: ['', Validators.required],
      engineerCost: ['', Validators.required]
    });
  }

  createPartGroup(): FormGroup {
    return this.fb.group({
      partName: ['', Validators.required],
      partSerialNumber: ['', Validators.required],
      partNumber: ['', Validators.required],
      partDescription: ['', Validators.required]
    });
  }

  validateAllFormFields(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        control.controls.forEach(group => this.validateAllFormFields(group as FormGroup));
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }

  onPartsCountChange(event: Event): void {
    const countParts = +(event.target as HTMLSelectElement).value;
    this.updateFormArray(this.parts, countParts, this.createPartGroup.bind(this));
  }

  onEngineerCountChange(event: Event): void {
    const count = +(event.target as HTMLSelectElement).value;
    this.updateFormArray(this.engineers, count, this.createEngineerGroup.bind(this));
  }

  onSubmit(): void {
    if (this.discountForm.valid) {
      this.isLoading = true;
      const discountData = this.discountForm.getRawValue(); // Get form data including disabled fields
      discountData.ticketStatus = 'CLOSED'; // Set ticket status to CLOSED
      this.http.post(`${environment.apiUrl}/discount/save`, discountData).subscribe(
        (response) => {
          alert('Ticket closed successfully');
          this.router.navigate(['/category']);
        },
        (error) => {
          console.error('Error closing ticket', error);
          if (error.status === 409) {
            this.isLoading = false;
            alert('Conflict occurred while closing the ticket. Please try again.');
          }
        }
      );
    } else {
      this.validateAllFormFields(this.discountForm);
      alert('Please fill in all required fields.');
    }
  }

  onBack(): void {
    this.router.navigate(['/category']); 
  }

  onUpdate(): void {
    this.isLoading = true;
    const discountData = this.discountForm.getRawValue(); // Get form data including disabled fields
    this.http.put(`${environment.apiUrl}/discount/update`, discountData).subscribe(
      (response) => {
        alert('Ticket updated successfully');
        this.router.navigate(['/category']);
        this.fetchTicketDetails(this.ticketNumber);
      },
      (error) => {
        this.isLoading = false;
        console.error('Error updating ticket', error);
      }
    );
  }
}