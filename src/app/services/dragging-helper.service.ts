import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GoalsProviderService } from 'src/app/services/goals-provider.service';

@Injectable({
  providedIn: 'root'
})
export class DraggingHelperService {

  constructor(private goalsProvider: GoalsProviderService) {
  }

  public drop(event: CdkDragDrop<string[]>, isTheSameComponent = true): void {
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
    console.log(event.previousContainer.data, 'new data in goals');
    console.log(event.container.data, 'new data in goals');
    this.goalsProvider.updateGoalsFromDrop(event.container.data);
  }
}
