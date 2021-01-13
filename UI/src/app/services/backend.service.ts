import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalDetailsModel } from 'src/app/models/personal-details.model';
import { ResponseModel } from 'src/app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private SERVICE_PATH: string = '/export-email';

  constructor(private http: HttpClient) {
  }

  public sendGoals(details: PersonalDetailsModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.SERVICE_PATH, details ).pipe(
      response => response
    );
  }
}

