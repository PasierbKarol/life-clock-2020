import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-welcome-info',
  templateUrl: './welcome-info.component.html',
  styleUrls: ['./welcome-info.component.scss']
})
export class WelcomeInfoComponent implements OnInit {

  private descriptions = AppConstants.getDescriptions('PL');
  public title = this.descriptions.introduction_title;
  public descriptionStart = this.descriptions.introduction;
  public descriptionMiddle = this.descriptions.introduction_middle;
  public descriptionFinal = this.descriptions.introduction_final;

  constructor() {
  }

  ngOnInit() {
  }

}
