import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export function getAccessToken(): string {
    return localStorage.getItem('token');
  }
  export const jwtConfig = {
    tokenGetter: getAccessToken,
    whitelistedDomains: ['localhost:5000']
  };

@NgModule({
    imports: [CommonModule, LoginRoutingModule, FormsModule ],
    providers: [],
    declarations: [LoginComponent]
})
export class LoginModule {}
