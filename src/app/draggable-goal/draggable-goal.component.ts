import { Component, Input, OnChanges } from '@angular/core';
import { LifeGoalModel } from 'src/app/models/life-goal.model';
import { GoalsProviderService } from 'src/app/services/goals-provider.service';

@Component({
  selector: 'app-draggable-goal',
  templateUrl: './draggable-goal.component.html',
  styleUrls: ['./draggable-goal.component.scss']
})
export class DraggableGoalComponent implements OnChanges {
  @Input() public lifeGoal: LifeGoalModel;
  private originalGoal: LifeGoalModel;

  public isEditable: boolean = false;

  public constructor(
    private goalsProvider: GoalsProviderService
  ) {
  }

  public updateField() {
    this.isEditable = false;
    this.goalsProvider.updateGoal(this.lifeGoal, this.originalGoal);
    this.originalGoal = this.lifeGoal;
  }

  public ngOnChanges(): void {
    this.originalGoal = this.lifeGoal;
  }
}
