import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient } from '@angular/common/http';
import { Card } from '../_models/card';
import { CardInfo } from '../_models/cardInfo';

@Injectable()
export class CardService {
    baseUrl = environment.apiUrl;
constructor(private authHttp: HttpClient) { }

getCards(projectId: number): Observable<CardInfo[]> {
    return this.authHttp.get<CardInfo[]>(this.baseUrl + 'card/getCards/'+ projectId);
}

addCard(card: Card, projectId: number) {
    return this.authHttp.post<Card>(this.baseUrl + 'card/addCard/' + projectId,card);
}

deleteCard(card: Card) {
    return this.authHttp.post<Card>(this.baseUrl + 'card/deleteCard/',card);
}

editCard(card: Card) {
    return this.authHttp.post<Card>(this.baseUrl + 'card/editCard/',card);
}

}
