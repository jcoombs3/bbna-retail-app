import { NgModule } from '@angular/core';
import {
  NotificationsBadgeModule,
  NotificationsCommunicationService,
  NotificationsPopupsModule,
} from '@backbase/notifications-ang';
import { NotificationsCommunication } from '../communication/notifications-communication.service';

@NgModule({
  exports: [NotificationsBadgeModule, NotificationsPopupsModule],
  providers: [
    NotificationsCommunication,
    {
      provide: NotificationsCommunicationService,
      useExisting: NotificationsCommunication,
    },
  ],
})
export class NotificationsModule {}
