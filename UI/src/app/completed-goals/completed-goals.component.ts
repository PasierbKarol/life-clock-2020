import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { PersonalDetailsModel } from 'src/app/models/personal-details.model';
import { BackendService } from 'src/app/services/backend.service';
import { GoalsProviderService } from 'src/app/services/goals-provider.service';

@Component({
  selector: 'app-completed-goals',
  templateUrl: './completed-goals.component.html',
  styleUrls: ['./completed-goals.component.scss']
})
export class CompletedGoalsComponent implements OnInit {

  @Input() public summary: string;
  public personalDetails: PersonalDetailsModel = new PersonalDetailsModel();

  public constructor(
    private backend: BackendService,
    private goalsProvider: GoalsProviderService,
    private snackBar: MatSnackBar
  ) {
  }

  public ngOnInit() {
    this.goalsProvider.goals$.subscribe(allGoals => {
      this.personalDetails.submittedGoals = allGoals.map(goal => goal);
    });
  }

  public sendByEmail(): void {
    this.backend.sendGoalsByEmail(this.personalDetails).subscribe(response => {
        console.log(response, 'Response in email');
        this.successfulOperation(response.responseJSON);
      },
      error => this.errorHandling(error, 'The email could not be sent! Error=')
    );
  }

  public exportToPDF(): void {
    this.backend.exportGoalsToPDF(this.personalDetails.submittedGoals).subscribe(
      response => {
        console.log(response, 'Response in PDF');
        saveAs(response, `Life-Clock-Goals.pdf`);
        this.successfulOperation('PDF was successfully created!');
      },
      error => this.errorHandling(error, 'The PDF could not be exported! Error='));
  }

  private errorHandling(error: HttpErrorResponse, message: string): void {
    console.log(error, 'Error returned');
    const errorMessage = error.error.message;
    const emailSentSnackBar =
      this.snackBar.open(`${message}${!!errorMessage ? errorMessage : error.message}`, 'Close', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    emailSentSnackBar.onAction().subscribe(() => emailSentSnackBar.dismiss());
  }

  private successfulOperation(message: string): void {
    const successfulSnackBar = this.snackBar.open(message, 'Close', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    successfulSnackBar.onAction().subscribe(() => successfulSnackBar.dismiss());
  }

  public emailInput = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.emailInput.hasError('required')) {
      return 'Musisz podać email, aby otrzymać rezultaty pocztą';
    }

    return this.emailInput.hasError('email') ? 'Podany email nie jest właściwy' : '';
  }
}
