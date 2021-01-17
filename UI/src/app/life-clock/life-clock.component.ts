import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { LifeGoalModel } from 'src/app/models/life-goal.model';
import { GoalsProviderService } from 'src/app/services/goals-provider.service';
import { DraggingHelperService } from '../services/dragging-helper.service';

@Component({
  selector: 'app-life-clock',
  templateUrl: './life-clock.component.html',
  styleUrls: ['./life-clock.component.scss']
})
export class LifeClockComponent implements OnChanges, OnInit {

  @ViewChild('lifeList', {static: false}) public lifeList: ElementRef;
  private descriptions = AppConstants.getDescriptions('PL');
  public goalsTexts: any = this.descriptions.goalBlocks;
  public listInstructions: string = this.descriptions.list_instructions;
  public summary: string = this.descriptions.final_summary;
  public currentlyVisibleSection: number = 0;
  public lifeGoals: LifeGoalModel[] = [];
  public areGoalsSubmitted: boolean;

  public constructor(
    private draggingService: DraggingHelperService,
    private goalsProvider: GoalsProviderService
  ) {
  }

  public onDrop(event: CdkDragDrop<LifeGoalModel[]>) {
    this.draggingService.drop(event, AppConstants.LIFE_CLOCK);
  }

  public ngOnChanges() {
    this.lifeGoals = [];
  }

  public ngOnInit(): void {
    this.goalsProvider.goals$.subscribe(allGoals => {
      this.lifeGoals = allGoals.filter(goal => goal.placement === AppConstants.LIFE_CLOCK);
    });

    this.areGoalsSubmitted = !!this.goalsProvider.areGoalsInLocalStorage;

    this.goalsProvider.sectionsCompleted$.subscribe(section => this.currentlyVisibleSection = section);
    this.goalsProvider.readSectionsFromStorage();
  }

  public sectionCompleted(id: number): void {
    this.currentlyVisibleSection = id > this.currentlyVisibleSection ? id : this.currentlyVisibleSection;
    this.goalsProvider.updateCompletedSections(this.currentlyVisibleSection);
  }

  public listSubmitted(goalsFromView: any): void {
    this.areGoalsSubmitted = true;
    this.goalsProvider.createGoalsFromList(goalsFromView, AppConstants.LIFE_CLOCK);
    this.lifeList.nativeElement.value = '';
  }

  public startOver(): void {
    this.goalsProvider.clearGoals();
    this.areGoalsSubmitted = false;
    this.currentlyVisibleSection = 0;
  }

}
