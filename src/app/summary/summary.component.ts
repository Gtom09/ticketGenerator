import { NgClass, NgIf, NgFor, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



interface Ticket {
  ackDate: String;
  lconName: String;
  clientPhone: String;
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
  isLoading: boolean = true;

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
    this.http.get<Ticket[]>(`${environment.apiUrl}/discount/fetch/allClosed`).subscribe(
      (data) => {
        this.tickets = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching tickets', error);
        this.isLoading = false;
      }
    );
  }

  updateDiscounts(ticketNumber: string) {
    this.router.navigate(['/full-summary', ticketNumber]);
  }

  goBack() {
    this.router.navigate(['/dashboard'], {
      state: {
        policyData: this.policyData,
        summaryData: this.summaryForm.value,
      },
    });
  }
} 