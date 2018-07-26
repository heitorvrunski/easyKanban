import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService, private alertify: AlertifyService) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.loggedIn()) {
          return true;
        }
        this.alertify.error('Must logon to access this page !');
        this.router.navigate(['/login']);
        return false;
      }
}
