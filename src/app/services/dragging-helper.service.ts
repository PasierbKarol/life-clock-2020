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

  public drop(event: CdkDragDrop<LifeGoalModel[]>, placement: string , isTheSameComponent = true): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (isTheSameComponent) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      console.log('drag between components');
      if (event.currentIndex === 0) {
        console.log('create new list in this place');
      }
    }
    event.container.data.map(goal => goal.placement = placement);
    console.log(event.previousContainer.data, 'OLD data in goals');
    console.log(event.container.data, 'new data in goals');
    const goalToUpdate = event.container.data[event.currentIndex];
    console.log(goalToUpdate, 'moving goal');

    this.goalsProvider.updateGoalsFromDrop(goalToUpdate, placement);
  }
}
