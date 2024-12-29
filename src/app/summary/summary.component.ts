import { NgClass, NgIf, NgFor, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Ticket {
  ticketNumber: string;
  caseDescription: string;
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  policyData: any;
  summaryForm!: FormGroup;
  completePolicyData: any;
  tickets: Ticket[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.summaryForm = this.fb.group({
      exampleControl: ['', Validators.required]
    });
    this.fetchTickets();
  }

  fetchTickets() {
    this.http.get<Ticket[]>('http://localhost:8080/discount/fetch/allClosed').subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Error fetching tickets', error);
      }
    );
  }

  updateDiscounts(ticketNumber: string) {
    this.router.navigate(['/full-summary', ticketNumber]);
  }

  goBack() {
    this.router.navigate(['/policy'], {
      state: {
        policyData: this.policyData,
        summaryData: this.summaryForm.value,
      },
    });
  }
} 