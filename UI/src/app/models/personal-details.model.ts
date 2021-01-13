import { LifeGoalModel } from 'src/app/models/life-goal.model';

export class PersonalDetailsModel {
  public submittedGoals: LifeGoalModel[];
  public name: string;
  public surname: string;
  public email: string;
}
