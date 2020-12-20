import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DraggingHelperService } from '../services/dragging-helper.service';

@Component({
  selector: 'app-goals-box',
  templateUrl: './goals-box.component.html',
  styleUrls: ['./goals-box.component.scss']
})
export class GoalsBoxComponent implements OnChanges {

  public goals: string[];
  @Input() public blockId: string;
  @Input() public index: string;
  @Input() public blockTitle: string;
  @Input() public blockDescription: string;
  @Input() public dragListOrigin: any;
  @Output() public sectionSubmitted: EventEmitter<any> = new EventEmitter<any>();
  private isSectionCompleted: boolean = false;

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
    this.isSectionCompleted = true;
    this.sectionSubmitted.emit(this.index + 1);
  }
}
