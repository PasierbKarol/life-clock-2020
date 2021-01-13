import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditModeDirective } from './directives/edit-mode.directive';
import { ViewModeDirective } from './directives/view-mode.directive';
import { DraggableGoalComponent } from './draggable-goal/draggable-goal.component';
import { EditableComponent } from './editable/editable.component';
import { GoalsBoxComponent } from './goals-box/goals-box.component';
import { LifeClockComponent } from './life-clock/life-clock.component';
import { MaterialModule } from './material/material.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { WelcomeInfoComponent } from './welcome-info/welcome-info.component';
import { CompletedGoalsComponent } from './completed-goals/completed-goals.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeInfoComponent,
    LifeClockComponent,
    GoalsBoxComponent,
    NavigationBarComponent,
    DraggableGoalComponent,
    ViewModeDirective,
    EditModeDirective,
    EditableComponent,
    CompletedGoalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    DragDropModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
