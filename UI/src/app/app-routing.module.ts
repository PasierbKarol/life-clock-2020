import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTE_TYPE_TITLE, AppRouteType } from './app-route-type.js';
import { AuthorisationGuard } from './guards/authorisation-guard.service';
import { LifeClockComponent } from './life-clock/life-clock.component';
import { WelcomeInfoComponent } from './welcome-info/welcome-info.component';

export const APP_ROUTE_PREFIX = 'life-clock';
// const DEFAULT_ROUTE = `${APP_ROUTE_PREFIX}`;
const DEFAULT_ROUTE = AppRouteType.WELCOME;

export const routes: Routes = [
  {path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full', canActivate: [AuthorisationGuard]},
  /*  {path: AppRouteType.APP_LOGIN, component: LoginFormComponent, data: {title: APP_ROUTE_TYPE_TITLE.get(AppRouteType.APP_LOGIN)}},
   {
   path: AppRouteType.APP_REGISTRATION,
   component: RegistrationFormComponent,
   data: {title: APP_ROUTE_TYPE_TITLE.get(AppRouteType.APP_REGISTRATION)}
   },*/
  {
    // path: `${APP_ROUTE_PREFIX}/${AppRouteType.WELCOME}`,
    path: AppRouteType.WELCOME,
    component: WelcomeInfoComponent,
    data: {title: APP_ROUTE_TYPE_TITLE.get(AppRouteType.WELCOME)},
    canActivate: [AuthorisationGuard]
  },
  {
    // path: `${APP_ROUTE_PREFIX}/${AppRouteType.CLOCK}`,
    path: AppRouteType.CLOCK,
    component: LifeClockComponent,
    data: {title: APP_ROUTE_TYPE_TITLE.get(AppRouteType.CLOCK)},
    canActivate: [AuthorisationGuard]
  },
  {path: '**', redirectTo: DEFAULT_ROUTE}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
