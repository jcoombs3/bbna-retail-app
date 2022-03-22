import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { TransfersRestrictedDatesConfiguration, CONFIG_TOKEN } from './configuration';
import { HttpClient } from '@angular/common/http';

import { DataModulesManager } from "@backbase/foundation-ang/data-http";

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers:    []
})
export class TransfersRestrictedDatesApiModule {
    public static forRoot(configurationFactory: () => TransfersRestrictedDatesConfiguration): ModuleWithProviders<TransfersRestrictedDatesApiModule> {
        return {
            ngModule: TransfersRestrictedDatesApiModule,
            providers: [ { provide: TransfersRestrictedDatesConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: TransfersRestrictedDatesApiModule,
                 @Optional() http: HttpClient,
                 @Optional() dataModulesManager: DataModulesManager | null,
                 config: TransfersRestrictedDatesConfiguration,

        ) {
        if (parentModule) {
            throw new Error('TransfersRestrictedDatesApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }

        if (dataModulesManager) {
            dataModulesManager.setModuleConfig(CONFIG_TOKEN, {
                apiRoot: '',
                servicePath: config.basePath || '',
                headers: {},
            });
        }
    }
}
