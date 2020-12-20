import { Component, ElementRef, OnChanges, ViewChild } from '@angular/core';
import { ContentConstants } from './content-constants';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DraggingHelperService } from '../services/dragging-helper.service';

@Component({
  selector: 'app-life-clock',
  templateUrl: './life-clock.component.html',
  styleUrls: ['./life-clock.component.scss']
})
export class LifeClockComponent implements OnChanges {

  @ViewChild('draggableGoalsList', { static: false }) public draggableGoalsList: ElementRef;
  public goalsTexts: any = ContentConstants.getDescriptions('PL').goalBlocks;
  public sections: number = this.goalsTexts.length;
  public currentlyVisibleSection: number = 0;
  public goals: string[];
  public copiedGoals: string[];
  public areGoalsSubmitted: boolean = false;

  public constructor(private draggingService: DraggingHelperService) {
  }

  public onDrop(event: CdkDragDrop<string[]>) {
    this.goals = this.draggingService.drop(event);
  }

  public ngOnChanges() {
    this.goals = [];
    this.copiedGoals = this.copyGoals();
  }

  public sectionCompleted(id: number): void {
    console.log(id, 'section completed');
    this.currentlyVisibleSection = id > this.currentlyVisibleSection ? id : this.currentlyVisibleSection;
  }

  public listSubmitted(goalsFromView: any): void {
    this.areGoalsSubmitted = true;
    console.log(this.draggableGoalsList, 'el ref');
    this.goals = goalsFromView.split(/\n/g);
    // TODO clear list

  }

  public copyGoals(): string[] {
    return this.goals.concat();
  }

}
