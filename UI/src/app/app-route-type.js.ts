import { Map as ImmutableMap } from 'immutable';

export enum AppRouteType {
  APP_LOGIN = 'login',
  APP_REGISTRATION = 'registration',
  WELCOME = 'welcome',
  CLOCK = 'clock'
}

export const APP_ROUTE_TYPE_TITLE =
  ImmutableMap<AppRouteType, string>
  (new Map<AppRouteType, string>([
    [AppRouteType.APP_LOGIN, 'Login'],
    [AppRouteType.APP_REGISTRATION, 'Registration'],
    [AppRouteType.WELCOME, 'Life Clock 2020 - Welcome'],
    [AppRouteType.CLOCK, 'Life Clock']
  ]));
