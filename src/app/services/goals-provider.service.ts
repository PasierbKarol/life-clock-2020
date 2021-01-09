import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalsProviderService {

  public goals: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);
  public goals$ = this.goals.asObservable();

  constructor() {
  }

  public createGoalsFromList(goalsFromView: any): void {
    let goalsToUpdate = goalsFromView.split(/\n/g);
    goalsToUpdate = goalsToUpdate.filter(v => v !== '');
    console.log(goalsFromView, 'goalsFromView to update');
    console.log(goalsToUpdate, 'goals to update');
    this.goals.next(goalsToUpdate);
  }

  public updateGoalsFromDrop(goals: any): void {
    this.goals.next(goals);
  }

  public clearGoals(): void {
    this.goals.next([]);
  }

  public updateGoal(goalNew: string, goalOld: string) {
    let updatedGoals = this.goals.value;
    const index = updatedGoals.findIndex(name => name === goalOld);
    updatedGoals[index] = goalNew;
  }
}
