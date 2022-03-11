import { NgModule } from '@angular/core';
import {
  AuthorizedUsersJourneyConfiguration,
  AuthorizedUsersJourneyConfigurationToken,
  AuthorizedUsersJourneyModule,
  DEFAULT_UI_LEVELS_CONFIG,
  DEFAULT_UI_PERMISSIONS_CONFIG,
  LevelsMappingConfigImplementation,
} from '@backbase/authorized-users-journey-ang';

@NgModule({
  imports: [AuthorizedUsersJourneyModule.forRoot()],
  providers: [
    {
      provide: AuthorizedUsersJourneyConfigurationToken,
      useValue: {
        levelsConfig: {
          mappings: new LevelsMappingConfigImplementation(),
          uiConfig: {
            ...DEFAULT_UI_LEVELS_CONFIG,
            ...DEFAULT_UI_PERMISSIONS_CONFIG,
          },
        } as Partial<AuthorizedUsersJourneyConfiguration<any, any>>,
      },
    },
  ],
})
export class AuthorizedUsersJourneyBundleModule {}
