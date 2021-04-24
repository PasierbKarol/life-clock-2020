import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app-constants';
import { AppRouteType } from 'src/app/app-route-type.js';

@Component({
  selector: 'app-welcome-info',
  templateUrl: './welcome-info.component.html',
  styleUrls: ['./welcome-info.component.scss']
})
export class WelcomeInfoComponent {

  private descriptions = AppConstants.getDescriptions('PL');
  public title = this.descriptions.introduction_title;
  public descriptionStart = this.descriptions.introduction;
  public descriptionMiddle = this.descriptions.introduction_middle;
  public descriptionFinal = this.descriptions.introduction_final;

  constructor(private router: Router) {
  }

  public startLifeClock() {
    this.router.navigate([AppRouteType.CLOCK]);
  }
}
