import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'life-clock-2020';
  constructor(@Inject(DOCUMENT) private document) {
  }

  ngOnInit(): void {
    let bases = this.document.getElementsByTagName('base');

    if (bases.length > 0) {
      bases[0].setAttribute('href', environment.baseHref);

    }
  }

}
