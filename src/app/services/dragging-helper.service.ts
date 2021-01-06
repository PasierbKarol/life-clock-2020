import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class DraggingHelperService {

  constructor() {
  }

  public drop(event: CdkDragDrop<string[]>, isTheSameComponent = true): string[] {
    console.log(event, 'on drop');
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (isTheSameComponent) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      console.log(event.container.data, 'list that was moved');
      console.log(event.previousContainer.data);
    } else {
      console.log('drag between components');
      if (event.currentIndex === 0) {
        console.log('create new list in this place');
      }
    }

    return event.container.data;
  }
}