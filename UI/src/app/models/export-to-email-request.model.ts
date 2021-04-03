import { LifeGoalModel } from 'src/app/models/life-goal.model';

export class ExportToEmailRequestModel {
    public personalDetails: { name: string, surname?: string, email: string };
    public goals: LifeGoalModel[];
}
