import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ContentConstants } from './content-constants';

@Component({
  selector: 'app-life-clock',
  templateUrl: './life-clock.component.html',
  styleUrls: ['./life-clock.component.scss']
})
export class LifeClockComponent implements OnInit {

  @ViewChild('draggableGoalsList', { static: false }) public draggableGoalsList: ElementRef;
  public goalsTexts: any = ContentConstants.lifeClockEN.goalBlocks;
  public sections: number = this.goalsTexts.length;
  public currentlyVisibleSection: number = 0;
  public goals: string[];
  public areGoalsSubmitted: boolean = false;

  public constructor(private renderer: Renderer2) {
  }

  public ngOnInit() {
  }

  public sectionCompleted(id: number): void {
    console.log(id, 'section completed');
    this.currentlyVisibleSection = id > this.currentlyVisibleSection ? id : this.currentlyVisibleSection;
  }

  public listSubmitted(goalsFromView: any): void {
    this.areGoalsSubmitted = true;
    console.log(goalsFromView.split(/\n/g), 'value goals');
    console.log(this.draggableGoalsList, 'el ref');
    this.goals = goalsFromView.split(/\n/g);
    this.composeDraggableGoals();

  }

  private composeDraggableGoals(): void {
    for (const goal of this.goals) {
      const dragGoal = this.renderer.createElement('div');
      this.renderer.addClass(dragGoal, 'draggable-goal');
      const text = this.renderer.createText(goal);
      this.renderer.appendChild(dragGoal, text);
      this.renderer.appendChild(this.draggableGoalsList.nativeElement, dragGoal);
    }
  }
}
