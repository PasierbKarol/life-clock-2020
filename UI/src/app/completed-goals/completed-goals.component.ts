import { Component, Input, OnInit } from '@angular/core';
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

  public submitGoals(): void {
    console.log(this.personalDetails, 'personal details');
    const response: ResponseModel = new ResponseModel();
      this.backend.sendGoals(this.personalDetails).subscribe( r => {
        response.httpCode = r.httpCode;
        response.responseJSON = r.responseJSON;
      });
      console.log(response, 'response');
  }
}
