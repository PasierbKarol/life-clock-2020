import { Component, OnInit } from '@angular/core';
import { ContentConstants } from './content-constants';

@Component({
  selector: 'app-life-clock',
  templateUrl: './life-clock.component.html',
  styleUrls: ['./life-clock.component.scss']
})
export class LifeClockComponent implements OnInit {

  public goals: any = ContentConstants.lifeClockEN.goalBlocks;
  public sections: number = this.goals.length;
  public currentlyVisibleSection: number = 0;

  public constructor() {
  }

  public ngOnInit() {
  }

  public sectionCompleted(id: number): void {
    console.log(id, 'section completed');
    this.currentlyVisibleSection = id > this.currentlyVisibleSection ? id : this.currentlyVisibleSection;
  }
}
