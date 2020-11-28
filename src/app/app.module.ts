import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeInfoComponent } from './welcome-info/welcome-info.component';
import { LifeClockComponent } from './life-clock/life-clock.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeInfoComponent,
    LifeClockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
