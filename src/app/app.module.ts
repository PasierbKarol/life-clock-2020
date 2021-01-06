import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeInfoComponent } from './welcome-info/welcome-info.component';
import { LifeClockComponent } from './life-clock/life-clock.component';
import { GoalsBoxComponent } from './goals-box/goals-box.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DraggableGoalComponent } from './draggable-goal/draggable-goal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditModeDirective } from './directives/edit-mode.directive';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeInfoComponent,
    LifeClockComponent,
    GoalsBoxComponent,
    NavigationBarComponent,
    DraggableGoalComponent,
    ViewModeDirective,
    EditModeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule
  ],
  exports: [
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
