import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DraggingHelperService } from '../services/dragging-helper.service';

@Component({
  selector: 'app-goals-box',
  templateUrl: './goals-box.component.html',
  styleUrls: ['./goals-box.component.scss']
})
export class GoalsBoxComponent implements OnChanges {

  @Input() public blockId: string;
  @Input() public index: string;
  @Input() public blockTitle: string;
  @Input() public blockDescription: string;
  public goals: string[];
  @Input() public dragListOrigin: any;
  @Output() public sectionSubmitted: EventEmitter<any> = new EventEmitter<any>();

  public constructor(private draggingService: DraggingHelperService) {
  }

  public ngOnChanges() {
    console.log(this.dragListOrigin, 'origin list');
    this.goals = [];
  }

  public onDrop(event: CdkDragDrop<string[]>) {
    this.goals = this.draggingService.drop(event);
  }

  public completeSection(): void {
    this.sectionSubmitted.emit(this.index + 1);
  }
}
