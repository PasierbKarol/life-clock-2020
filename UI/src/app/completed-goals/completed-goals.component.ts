import { Component, OnInit } from '@angular/core';
import { PersonalDetailsModel } from 'src/app/models/personal-details.model';

@Component({
  selector: 'app-completed-goals',
  templateUrl: './completed-goals.component.html',
  styleUrls: ['./completed-goals.component.scss']
})
export class CompletedGoalsComponent implements OnInit {

  public personalDetails: PersonalDetailsModel = new PersonalDetailsModel();

  public constructor() { }

  public ngOnInit() {
  }

  public submitGoals(): void {
    console.log(this.personalDetails, 'personal details');
  }
}
