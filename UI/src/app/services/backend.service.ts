import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExportToEmailRequestModel } from 'src/app/models/export-to-email-request.model';
import { LifeGoalModel } from 'src/app/models/life-goal.model';
import { PersonalDetailsModel } from 'src/app/models/personal-details.model';
import { ResponseModel } from 'src/app/models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private SERVICE_PATH: string = environment.serverEndpoint;

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
      map(r => r)
    );
  }

  public exportGoalsToPDF(dataToExport: LifeGoalModel[]): Observable<Blob> {
    const HTTPOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      }),
      'responseType': 'blob' as 'json'
    };

    return this.http.post<Blob>(`${this.SERVICE_PATH}/export-goals-by-pdf`, dataToExport, HTTPOptions).pipe(
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

