import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {APP_ROUTE_TYPE_TITLE, AppRouteType} from './app-route-type.js';
import {WelcomeInfoComponent} from './welcome-info/welcome-info.component';
import {AuthorisationGuard} from './guards/authorisation-guard.service';

export const APP_ROUTE_PREFIX = 'app';
const DEFAULT_ROUTE = `${APP_ROUTE_PREFIX}/`;

export const routes: Routes = [
  {path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full', canActivate: [AuthorisationGuard]},
  {path: AppRouteType.APP_LOGIN, component: LoginFormComponent, data: {title: APP_ROUTE_TYPE_TITLE.get(AppRouteType.APP_LOGIN)}},
  {
    path: AppRouteType.APP_REGISTRATION,
    component: RegistrationFormComponent,
    data: {title: APP_ROUTE_TYPE_TITLE.get(AppRouteType.APP_REGISTRATION)}
  },

  {
    path: AppRouteType.WELCOME,
    component: WelcomeInfoComponent,
    data: {title: APP_ROUTE_TYPE_TITLE.get(AppRouteType.WELCOME)},
    canActivate: [AuthorisationGuard]
  },
  {
    path: AppRouteType.CLOCK,
    component: LevelsInCalendarComponent,
    data: {title: APP_ROUTE_TYPE_TITLE.get(AppRouteType.CLOCK)},
    canActivate: [AuthorisationGuard]
  },
  {path: '**', redirectTo: DEFAULT_ROUTE}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
