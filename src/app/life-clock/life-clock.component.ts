import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { LifeGoalModel } from 'src/app/models/life-goal.model';
import { GoalsProviderService } from 'src/app/services/goals-provider.service';
import { DraggingHelperService } from '../services/dragging-helper.service';
import { ContentConstants } from './content-constants';

@Component({
  selector: 'app-life-clock',
  templateUrl: './life-clock.component.html',
  styleUrls: ['./life-clock.component.scss']
})
export class LifeClockComponent implements OnChanges, OnInit {

  @ViewChild('lifeList', {static: false}) public lifeList: ElementRef;
  private descriptions = ContentConstants.getDescriptions('PL');
  public goalsTexts: any = this.descriptions.goalBlocks;
  public listInstructions: string = this.descriptions.list_instructions;
  public summary: string = this.descriptions.final_summary;
  public currentlyVisibleSection: number = 0;
  public lifeGoals: LifeGoalModel[] = [];
  public areGoalsSubmitted: boolean = false;

  public constructor(
    private draggingService: DraggingHelperService,
    private goalsProvider: GoalsProviderService
  ) {
  }

  public onDrop(event: CdkDragDrop<LifeGoalModel[]>) {
    this.draggingService.drop(event);
  }

  public ngOnChanges() {
    // this.goalsProvider.clearGoals();
    this.lifeGoals = [];
  }

  public ngOnInit(): void {
    this.goalsProvider.goals$.subscribe(allGoals => {
      this.lifeGoals = allGoals.map(goal => goal);
    });
  }

  public sectionCompleted(id: number): void {
    this.currentlyVisibleSection = id > this.currentlyVisibleSection ? id : this.currentlyVisibleSection;
  }

  public listSubmitted(goalsFromView: any): void {
    this.areGoalsSubmitted = true;
    this.goalsProvider.createGoalsFromList(goalsFromView, 'LifeClockComponent');
    this.lifeList.nativeElement.value = '';
  }

  public startOver(): void {
    this.lifeGoals = [];
    this.areGoalsSubmitted = false;
    this.currentlyVisibleSection = 0;
  }

}
