import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-draggable-goal',
  templateUrl: './draggable-goal.component.html',
  styleUrls: ['./draggable-goal.component.scss']
})
export class DraggableGoalComponent {
  @Input() public goal: string;

  public isEditable: boolean = false;

  public constructor() {
  }

  public updateField() {
  this.isEditable = false;
  }
}
