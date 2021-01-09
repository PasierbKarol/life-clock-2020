import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { LifeGoalModel } from 'src/app/models/life-goal.model';
import { DraggingHelperService } from 'src/app/services/dragging-helper.service';
import { GoalsProviderService } from 'src/app/services/goals-provider.service';

@Component({
  selector: 'app-goals-box',
  templateUrl: './goals-box.component.html',
  styleUrls: ['./goals-box.component.scss']
})
export class GoalsBoxComponent implements OnChanges, OnInit {

  public lifeGoals: LifeGoalModel[];
  @Input() public blockId: string;
  @Input() public index: string;
  @Input() public blockTitle: string;
  @Input() public blockDescription: string;
  @Output() public sectionSubmitted: EventEmitter<any> = new EventEmitter<any>();
  public isSectionCompleted: boolean = false;

  public constructor(
    private draggingService: DraggingHelperService,
    private goalsProvider: GoalsProviderService
  ) {
  }

  public ngOnChanges() {
    this.lifeGoals = [];
    this.isSectionCompleted = false;
  }

  public ngOnInit(): void {
    this.goalsProvider.goals$.subscribe(allGoals => {
      this.lifeGoals = allGoals.map(goal => goal);
    });
  }

  public onDrop(event: CdkDragDrop<LifeGoalModel[]>) {
    this.draggingService.drop(event);
  }

  public completeSection(): void {
    this.isSectionCompleted = true;
    this.sectionSubmitted.emit(this.index + 1);
  }
}
