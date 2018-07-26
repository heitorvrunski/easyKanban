import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authuser } from '../_models/authUser';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthService {
    baseurl = environment.apiUrl;
    userToken: any;
    decodedToken: any;
constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

login(model: any) {
    return this.http.post<Authuser>(this.baseurl + 'auth/login', model, { headers: new HttpHeaders()
        .set('Content-Type', 'application/json')})
        .map(user => {
        if (user) {
            localStorage.setItem('token', user.tokenString);
            this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
            console.log(this.decodedToken);
            this.userToken = user.tokenString;
        }
    });
}

loggedIn() {
    const token = this.jwtHelperService.tokenGetter();
    if (!token) {
        return false;
    }
    return !this.jwtHelperService.isTokenExpired(token);
}

register(model: any) {
    return this.http.post(this.baseurl + 'auth/register', model, { headers: new HttpHeaders()
        .set('Content-Type', 'application/json')});
}

getUserName() {
    const token = this.jwtHelperService.tokenGetter();
    const dToken = this.jwtHelperService.decodeToken(token);
    return dToken.unique_name;
}
}
