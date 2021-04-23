import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ExportToEmailRequestModel } from 'src/app/models/export-to-email-request.model';
import { PersonalDetailsModel } from 'src/app/models/personal-details.model';
import { ResponseModel } from 'src/app/models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private SERVICE_PATH: string = environment.serverEndpoint;

  public corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080/'
  });

  constructor(private http: HttpClient) {
  }

  public sendGoalsByEmail(details: PersonalDetailsModel): Observable<ResponseModel> {
    const data: ExportToEmailRequestModel = {
      personalDetails: {
        name: details.name,
        surname: details.surname,
        email: details.email
      }, goals: details.submittedGoals
    };

    return this.http.post<ResponseModel>(`${this.SERVICE_PATH}/send-goals-by-email`, data).pipe(
      tap( // Log the result or error
        data => console.log(data, 'returned from the server'),
        error => console.log(error, 'error from the server')
      )
    );
  }

  public exportGoalsToPDF(details: PersonalDetailsModel): Observable<Blob> {
    const data: ExportToEmailRequestModel = {
      personalDetails: {
        name: details.name,
        surname: details.surname,
        email: details.email
      }, goals: details.submittedGoals
    };

    const HTTPOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      }),
      'responseType': 'blob' as 'json'
    };

    return this.http.post<Blob>(`${this.SERVICE_PATH}/export-goals-by-pdf`, data, HTTPOptions).pipe(
      map(response => response)
    );
  }

  private base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

}

