import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableGoalComponent } from './draggable-goal.component';

describe('DraggableGoalComponent', () => {
  let component: DraggableGoalComponent;
  let fixture: ComponentFixture<DraggableGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggableGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
