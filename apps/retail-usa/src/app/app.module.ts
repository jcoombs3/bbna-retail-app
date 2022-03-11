import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RetailAppRemoteConfig } from '../remote-config/remote-config';
import { environment } from '../environments/environment';
import { appModuleImports } from './app-module-imports';
import { BankingComponent } from './banking/banking.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateRegistry } from '@backbase/foundation-ang/core';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RemoteConfigService } from '@backbase/remote-config-ang';
import { TransactionSigningModule } from '@backbase/identity-transaction-signing';

export function applicationInitializer(remoteConfig: RemoteConfigService<RetailAppRemoteConfig>) {
  return () => remoteConfig.fetchAndActivate();
}

@NgModule({
  declarations: [AppComponent, BankingComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule,
    TransactionSigningModule,
    environment.animation ? BrowserAnimationsModule : NoopAnimationsModule,
    ...appModuleImports,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: applicationInitializer,
      multi: true,
      deps: [RemoteConfigService],
    },
    TemplateRegistry,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ...(environment.production ? [] : environment.mockProviders),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
