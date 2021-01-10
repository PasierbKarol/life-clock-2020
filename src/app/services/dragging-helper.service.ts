import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { LifeGoalModel } from 'src/app/models/life-goal.model';
import { GoalsProviderService } from 'src/app/services/goals-provider.service';

@Injectable({
  providedIn: 'root'
})
export class DraggingHelperService {

  constructor(private goalsProvider: GoalsProviderService) {
  }

  public drop(event: CdkDragDrop<LifeGoalModel[]>, placement: string ): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.goalsProvider.updateGoalsFromDrop(event.container.data,event.currentIndex, placement);
  }
}
