import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    model: any = {};

    constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

    ngOnInit() {
    }

    logIn() {
      this.authService.login(this.model).subscribe(data => {
        this.alertify.success('Logged successfully !');
      }, error => {
        this.alertify.error('Error trying to Log in !');
      },
      () => { this.router.navigate(['/dashboard']);
      }
    );
    }

    signIn() {
        this.router.navigate(['/signup']);
    }
    loggedIn() {
      return this.authService.loggedIn();
    }

    logOut() {
      localStorage.removeItem('token');
      this.authService.userToken = null;
      this.router.navigate(['/login']);
    }


  }
