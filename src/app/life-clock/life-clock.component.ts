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
  @ViewChild('lifeList', { static: false }) public lifeList: ElementRef;
  private descriptions = ContentConstants.getDescriptions('PL');
  public goalsTexts: any = this.descriptions.goalBlocks;
  public listInstructions: string = this.descriptions.list_instructions;
  public summary: string = this.descriptions.final_summary;
  public currentlyVisibleSection: number = 0;
  public goals: string[];
  public areGoalsSubmitted: boolean = false;

  public constructor(private draggingService: DraggingHelperService) {
  }

  public onDrop(event: CdkDragDrop<string[]>) {
    this.goals = this.draggingService.drop(event);
  }

  public ngOnChanges() {
    this.goals = [];
  }

  public sectionCompleted(id: number): void {
    this.currentlyVisibleSection = id > this.currentlyVisibleSection ? id : this.currentlyVisibleSection;
  }

  public listSubmitted(goalsFromView: any): void {
    this.areGoalsSubmitted = true;
    this.goals = goalsFromView.split(/\n/g);
    this.goals = this.goals.filter(v => v !== '');
    this.lifeList.nativeElement.value = '';
  }

  public startOver(): void {
    this.goals = [];
    this.areGoalsSubmitted = false;
    this.currentlyVisibleSection = 0;
  }

}
