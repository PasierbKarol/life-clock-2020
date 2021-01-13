import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedGoalsComponent } from './completed-goals.component';

describe('CompletedGoalsComponent', () => {
  let component: CompletedGoalsComponent;
  let fixture: ComponentFixture<CompletedGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
