import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LifeGoalModel } from 'src/app/models/life-goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalsProviderService {

  public goals: BehaviorSubject<Array<LifeGoalModel>> = new BehaviorSubject<Array<LifeGoalModel>>([]);
  public goals$ = this.goals.asObservable();

  constructor() {
  }

  public createGoalsFromList(goalsFromView: any, placement: string): void {
    let rawGoalsToUpdate: string[] = goalsFromView.split(/\n/g);
    rawGoalsToUpdate = rawGoalsToUpdate.filter(v => v !== '');
    // console.log(goalsFromView, 'goalsFromView to update');
    // console.log(rawGoalsToUpdate, 'goals to update');
    const lifeGoalsList = rawGoalsToUpdate.map(goal => {
      let lifeGoal = new LifeGoalModel();
      lifeGoal.id = '';
      lifeGoal.name = goal;
      lifeGoal.placement = placement;
      return lifeGoal;
    });
    console.log(lifeGoalsList, 'goals as objects');
    this.goals.next(lifeGoalsList);
  }

  public updateGoalsFromDrop(goals: LifeGoalModel[]): void {
    this.goals.next(goals);
  }

  public clearGoals(): void {
    this.goals.next([]);
  }

  public updateGoal(goalNew: LifeGoalModel, goalOld: LifeGoalModel) {
    let updatedGoals = this.goals.value;
    const index = updatedGoals.findIndex(name => name === goalOld);
    updatedGoals[index] = goalNew;
  }
}