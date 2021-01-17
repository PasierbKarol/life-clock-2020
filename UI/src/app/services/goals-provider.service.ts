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
  }

  public updateGoal(goalNew: LifeGoalModel, goalOld: LifeGoalModel) {
    let updatedGoals = this.goals.value;
    const index = updatedGoals.findIndex(name => name === goalOld);
    updatedGoals[index] = goalNew;
    this.saveGoalsToLocalStorage(updatedGoals);
  }

  private saveGoalsToLocalStorage(goalsToSaveAndSend: Array<LifeGoalModel>): void {
    localStorage.setItem('LifeClock', JSON.stringify(goalsToSaveAndSend));
    console.log(goalsToSaveAndSend, 'saved goals');
    this.goals.next(goalsToSaveAndSend);
  }

  readGoalsFromLocalStorage(): void {
    const localStorageGoals = JSON.parse(localStorage.getItem('LifeClock'));
    console.log(localStorageGoals, 'read goals');
    this.areGoalsInLocalStorage = !!localStorageGoals;
    this.goals = new BehaviorSubject<Array<LifeGoalModel>>(!!localStorageGoals ? localStorageGoals : []);
    console.log(this.goals.value, 'read goals');
    this.goals$ = this.goals.asObservable();
    this.goals.next(this.goals.value);
  }
}
