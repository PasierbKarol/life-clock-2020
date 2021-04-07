import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PersonalDetailsModel } from 'src/app/models/personal-details.model';
import { ResponseModel } from 'src/app/models/response.model';
import { BackendService } from 'src/app/services/backend.service';
import { GoalsProviderService } from 'src/app/services/goals-provider.service';

@Component({
  selector: 'app-completed-goals',
  templateUrl: './completed-goals.component.html',
  styleUrls: ['./completed-goals.component.scss']
})
export class CompletedGoalsComponent implements OnInit {

  @Input() public summary: string;
  public personalDetails: PersonalDetailsModel = new PersonalDetailsModel();

  public constructor(
    private backend: BackendService,
    private goalsProvider: GoalsProviderService
  ) {
  }

  public ngOnInit() {
    this.goalsProvider.goals$.subscribe(allGoals => {
      this.personalDetails.submittedGoals = allGoals.map(goal => goal);
    });
  }

  public sendByEmail(): void {
    const response: ResponseModel = new ResponseModel();
      this.backend.sendGoalsByEmail(this.personalDetails).subscribe(r => {
        response.httpCode = r.httpCode;
        response.responseJSON = r.responseJSON;
      });
  }

  public exportToPDF(): void {
    const response: ResponseModel = new ResponseModel();
      this.backend.exportGoalsToPDF(this.personalDetails).subscribe(r => {
        response.httpCode = r.httpCode;
        response.responseJSON = r.responseJSON;
      });
  }

  public emailInput = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.emailInput.hasError('required')) {
      return 'Musisz podać email, aby otrzymać rezultaty pocztą';
    }

    return this.emailInput.hasError('email') ? 'Podany email nie jest właściwy' : '';
  }
}
