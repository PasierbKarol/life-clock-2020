import { Component, OnInit } from '@angular/core';
import { ContentConstants } from './content-constants';

@Component({
  selector: 'app-life-clock',
  templateUrl: './life-clock.component.html',
  styleUrls: ['./life-clock.component.scss']
})
export class LifeClockComponent implements OnInit {

  public goals = ContentConstants.lifeClockEN.goalBlocks;
  public constructor() { }

  public ngOnInit() {
  }

}
