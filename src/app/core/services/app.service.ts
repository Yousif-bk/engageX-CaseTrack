import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createCaseRequesr(createCaseForm: any): Observable<any> {
    return this.http.post(this.apiUrl + 'api/case/create', createCaseForm);
  }

  createCaseJira(caseData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/case/jira', caseData);
  }
}
