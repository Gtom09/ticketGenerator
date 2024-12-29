import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';
import { AdminService } from './admin.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private userService: UserService, private adminService: AdminService, private router: Router) {}
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('AuthGuard: Checking if user is logged in');
    if (this.userService.isLoggedIn() || this.adminService.isLoggedIn()) {
      console.log('AuthGuard: User is logged in');
      return true;
    } else {
      console.log('AuthGuard: User is not logged in, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }
} 
 