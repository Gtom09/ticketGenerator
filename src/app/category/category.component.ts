import { NgClass, NgIf, NgFor, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Ticket {
  ticketNumber: string;
  caseDescription: string;
  ackDate:String;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  policyData: any;
  categoryForm!: FormGroup;
  completePolicyData: any;
  tickets: Ticket[] = [];

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
    this.http.get<Ticket[]>('http://localhost:8080/discount/all').subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Error fetching tickets', error);
      }
    );
  }

  updateDiscounts(ticketNumber: string) {
    this.router.navigate(['/discount', ticketNumber]);
  }

  goBack() {
    this.router.navigate(['/policy'], {
      state: {
        policyData: this.policyData,
        categoryData: this.categoryForm.value,
      },
    });
  }
}