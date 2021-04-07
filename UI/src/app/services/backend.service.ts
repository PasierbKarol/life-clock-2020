import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ExportToEmailRequestModel } from 'src/app/models/export-to-email-request.model';
import { PersonalDetailsModel } from 'src/app/models/personal-details.model';
import { ResponseModel } from 'src/app/models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private SERVICE_PATH: string = `${environment.serverEndpoint}/export-goals-email`;

  public corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080/'
  });

  constructor(private http: HttpClient) {
  }

  public sendGoals(details: PersonalDetailsModel): Observable<ResponseModel> {
    const data: ExportToEmailRequestModel = {
      personalDetails: {
        name: details.name,
        surname: details.surname,
        email: details.email
      }, goals: details.submittedGoals
    };
    console.log(details, 'details for backend');
    console.log(data, 'JSON schema data for backend');


    return this.http.post<ResponseModel>(this.SERVICE_PATH, data).pipe(
      tap( // Log the result or error
        data => console.log(data, 'returned from the server'),
        error => console.log(error, 'error from the server')
      )
    );
  }
}

