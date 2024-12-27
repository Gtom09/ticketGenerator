import { CommonModule, NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {NavigationEnd, ROUTER_CONFIGURATION, ROUTES, Router, RouterLink, RouterOutlet, withRouterConfig } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  selectedTab: string = 'policyInfo';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  showHeader=false;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !['/', '/register'].includes(event.urlAfterRedirects);
      }
    });
  }

  logout() {
    this.router.navigate(['/'])
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => window.location.reload(), 1);
  }
}
