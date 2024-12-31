import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf and other directives
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Add CommonModule here for *ngIf and other directives
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent {
[x: string]: any;
  name: string = '';
  phoneNumber: string = '';
  bloodGroup: string = '';
  ticketId: string = '';
  profilePic: File | null = null;
  imageUrl: string = '';
  idCardVisible: boolean = false;
  constructor(private router: Router) { }

  companyLogoUrl = 'Assets/servodox.png';  // Path to your company logo

  // Handle file input for the profile picture
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Generate the ID card after the user clicks submit
  generateIdCard() {
    this.idCardVisible = true;
  }

  // Function to download the generated ID card as an image
  downloadIdCard() {
    const idCardElement = document.getElementById('idCard');
    if (idCardElement) {
      html2canvas(idCardElement).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'id_card.png';  // Set download name
        link.click();  // Trigger download
      }).catch((error) => {
        console.error("Error generating ID card image:", error);
      });
    }
  }
  
  onback() {
    this.router.navigate(['/dashboard']);
  }
  
  
}
