import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-goals-box',
  templateUrl: './goals-box.component.html',
  styleUrls: ['./goals-box.component.scss']
})
export class GoalsBoxComponent implements OnInit {

  @Input() public goalsBlockId: string;
  @Input() public goalsBlockTitle: string;
  @Input() public blockDescription: string;
  @Output() public sectionSubmitted: EventEmitter<any> = new EventEmitter<any>();

  public constructor() { }

  public ngOnInit() {
  }

  public completeSection(): void {
    this.sectionSubmitted.emit(this.goalsBlockId);
  }
}
