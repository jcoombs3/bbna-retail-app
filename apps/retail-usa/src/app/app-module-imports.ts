/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an array named
 * `appModuleImports`.
 *
 */

import { AppCoreModule } from '@backbase/common-banking';
import { RemoteConfigModule } from '@backbase/remote-config-ang';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { remoteConfigDefaults } from '../remote-config/remote-config';
import { AppDataModule } from './app-data.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { RetailModule } from './retail/retail.module';
import { environment } from '../environments/environment';

/**
 * Modules in this array are added to the `imports` array of the AppModule
 * in app.module.ts.
 */
export const appModuleImports = [
  AppCoreModule.forRoot(environment),
  AuthModule,
  RetailModule,
  AppDataModule,
  AppRoutingModule,
  StoreModule.forRoot({}),
  EffectsModule.forRoot([]),
  RemoteConfigModule.forRoot({
    appName: 'bb-retail-app-ang',
    appVersion: '2021.10-beta',
    defaults: remoteConfigDefaults,
    disabled: false,
    projectName: 'backbase-retail-prototypes',
    serviceRoot: '/api/remote-config',
  }),
];
