import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LifeClockComponent } from './life-clock.component';

describe('LifeClockComponent', () => {
  let component: LifeClockComponent;
  let fixture: ComponentFixture<LifeClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LifeClockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
