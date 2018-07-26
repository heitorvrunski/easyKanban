import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient } from '@angular/common/http';
import { Project } from '../_models/project';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProjectService {
    baseUrl = environment.apiUrl;
constructor(private authHttp: HttpClient) { }

getProjects(): Observable<Project[]> {
    return this.authHttp.get<Project[]>(this.baseUrl + 'project/getProjects');
}

addProject(project: Project) {
    return this.authHttp.post(this.baseUrl + 'project/addProject', project);
}

deleteProject(project: Project) {
    return this.authHttp.post(this.baseUrl + 'project/deleteProject', project);
}

}
