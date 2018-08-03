import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient } from '@angular/common/http';
import { Card } from '../_models/card';

@Injectable()
export class CardService {
    baseUrl = environment.apiUrl;
constructor(private authHttp: HttpClient) { }

getCards(projectId: number): Observable<Card[]> {
    return this.authHttp.get<Card[]>(this.baseUrl + 'card/getCards/'+ projectId);
}

addCard(card: Card) {
    return this.authHttp.post<Card>(this.baseUrl + 'card/addCard',card);
}

}
