import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Ticket {
  lconName: String;
  clientPhone: String;
  dueDate: String;
  ticketNumber: string;
  caseDescription: string;
  ackDate:String;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  policyData: any;
  categoryForm!: FormGroup;
  completePolicyData: any;
  tickets: Ticket[] = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      exampleControl: ['', Validators.required]
    });
    this.fetchTickets();
  }

  fetchTickets() {
    this.http.get<Ticket[]>(`${environment.apiUrl}/discount/all`).subscribe(
      (data) => {
        this.tickets = data;
        this.isLoading = false;  // Set to false once data is loaded
      },
      (error) => {
        console.error('Error fetching tickets', error);
        this.isLoading = false;  // Ensure loading is stopped even on error
      }
    );
  }

  updateDiscounts(ticketNumber: string) {
    this.router.navigate(['/discount', ticketNumber]);
  }

  goBack() {
    this.router.navigate(['/dashboard'], {
      state: {
        policyData: this.policyData,
        categoryData: this.categoryForm.value,
      },
    });
  }
  
}