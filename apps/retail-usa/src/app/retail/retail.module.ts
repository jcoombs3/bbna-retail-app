import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '@backbase/ui-ang/header';
import { ButtonModule } from '@backbase/ui-ang/button';
import { IconModule } from '@backbase/ui-ang/icon';
import { ModalModule } from '@backbase/ui-ang/modal';
import { LogoModule } from '@backbase/ui-ang/logo';
import { LayoutModule } from '@backbase/ui-ang/layout';
import { NotificationsBadgeWidgetModule } from '@backbase/notifications-badge-widget-ang';
import { NotificationsPopupsWidgetModule } from '@backbase/notifications-popups-widget-ang';
import { UserContextMenuWidgetModule } from '@backbase/user-context-menu-widget-ang';
import { RetailLayoutComponent } from './retail-layout/retail-layout.component';
import { NotificationsModule } from '../../journeys/notifications-bundle.module';
import { MegaMenuNavComponent } from './navigation-menu/mega-menu-navigation.component';
import { RouterModule } from '@angular/router';
import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import { ROUTABLE_MODAL_ROUTES } from './routable-modal/routable-modal.routes';
import { RoutableModalComponent } from './routable-modal/routable-modal.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    ButtonModule,
    IconModule,
    ModalModule,
    LogoModule,
    LayoutModule,
    NotificationsBadgeWidgetModule,
    NotificationsPopupsWidgetModule,
    UserContextMenuWidgetModule,
    NotificationsModule,
    RouterModule,
    EntitlementsModule,
    RouterModule.forChild(ROUTABLE_MODAL_ROUTES),
  ],
  exports: [RetailLayoutComponent, RoutableModalComponent],
  declarations: [RetailLayoutComponent, MegaMenuNavComponent, RoutableModalComponent],
})
export class RetailModule {}
