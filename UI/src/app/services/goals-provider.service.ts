import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LifeGoalModel } from 'src/app/models/life-goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalsProviderService {

  public goals: BehaviorSubject<Array<LifeGoalModel>>;
  public goals$;
  public areGoalsInLocalStorage: boolean = false;
  public currentlyVisibleSection: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public sectionsCompleted$ = this.currentlyVisibleSection.asObservable();

  constructor() {
    this.readGoalsFromLocalStorage();
  }

  public createGoalsFromList(goalsFromView: any, placement: string): void {
    let rawGoalsToUpdate: string[] = goalsFromView.split(/\n/g);
    rawGoalsToUpdate = rawGoalsToUpdate.filter(v => v !== '');

    const lifeGoalsList = rawGoalsToUpdate.map(goal => {
      let lifeGoal = new LifeGoalModel();
      lifeGoal.id = '';
      lifeGoal.name = goal;
      lifeGoal.placement = placement;
      return lifeGoal;
    });

    this.saveGoalsToLocalStorage(lifeGoalsList);
  }

  public updateGoalsFromDrop(updatedContainerGoals: LifeGoalModel[], index: number, placement): void {
    let updatedGoals = this.goals.value.concat();
    updatedContainerGoals[index].placement = placement;
    updatedGoals = updatedContainerGoals.concat(updatedGoals.filter(goal => goal.placement !== placement));
    this.saveGoalsToLocalStorage(updatedGoals);
  }

  public clearGoals(): void {
    this.saveGoalsToLocalStorage([]);
    this.currentlyVisibleSection.next(0);
    this.saveSectionsToStorage();
  }

  public updateGoal(goalNew: LifeGoalModel, goalOld: LifeGoalModel) {
    let updatedGoals = this.goals.value;
    const index = updatedGoals.findIndex(name => name === goalOld);
    updatedGoals[index] = goalNew;
    this.saveGoalsToLocalStorage(updatedGoals);
  }

  private saveGoalsToLocalStorage(goalsToSaveAndSend: Array<LifeGoalModel>): void {
    localStorage.setItem('LifeClock', JSON.stringify(goalsToSaveAndSend));
    this.goals.next(goalsToSaveAndSend);
  }

  private readGoalsFromLocalStorage(): void {
    const localStorageGoals = JSON.parse(localStorage.getItem('LifeClock'));
    this.areGoalsInLocalStorage = !!localStorageGoals;
    this.goals = new BehaviorSubject<Array<LifeGoalModel>>(!!localStorageGoals ? localStorageGoals : []);
    this.goals$ = this.goals.asObservable();
    this.goals.next(this.goals.value);
  }

  public updateCompletedSections(sectionID: number): void {
    this.currentlyVisibleSection.next(sectionID);
    this.saveSectionsToStorage();
  }

  private saveSectionsToStorage(): void {
    localStorage.setItem('LifeClockSectionID', JSON.stringify(this.currentlyVisibleSection.value.toString()));
  }

  public readSectionsFromStorage(): void {
    const localStorageVisibleSection = JSON.parse(localStorage.getItem('LifeClockSectionID'));
    this.currentlyVisibleSection.next(Number.parseInt(!!localStorageVisibleSection ? localStorageVisibleSection : '0'))
  }
}
