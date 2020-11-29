import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsBoxComponent } from './goals-box.component';

describe('GoalsBoxComponent', () => {
  let component: GoalsBoxComponent;
  let fixture: ComponentFixture<GoalsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
