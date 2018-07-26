import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
        model: any = {};
          constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

          ngOnInit() {
          }

          register() {
            if (this.model.password === this.model.confirmPassword) {
              this.authService.register(this.model).subscribe(() => {
                this.alertify.success('User registered !');
                this.router.navigate(['/login']);
              },
                  error => { this.alertify.error(error);
                }
              );
            } else {
              this.alertify.error('Password doesn`t match !');
            }
          }


      }
