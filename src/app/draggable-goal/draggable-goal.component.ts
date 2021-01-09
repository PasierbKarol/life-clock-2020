import { Component, Input, OnChanges } from '@angular/core';
import { GoalsProviderService } from 'src/app/services/goals-provider.service';

@Component({
  selector: 'app-draggable-goal',
  templateUrl: './draggable-goal.component.html',
  styleUrls: ['./draggable-goal.component.scss']
})
export class DraggableGoalComponent implements OnChanges{
  @Input() public goal: string;
  private originalGoal: string;

  public isEditable: boolean = false;

  public constructor(
    private goalsProvider: GoalsProviderService
  ) {
  }

  public updateField() {
    this.isEditable = false;
    this.goalsProvider.updateGoal(this.goal, this.originalGoal);
    this.originalGoal = this.goal;
  }

  public ngOnChanges(): void {
    this.originalGoal = this.goal;
  }
}
