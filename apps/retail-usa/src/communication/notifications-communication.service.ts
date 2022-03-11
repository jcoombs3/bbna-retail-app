import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationRouting, NotificationsCommunicationService } from '@backbase/notifications-ang';

@Injectable({
  providedIn: 'root',
})
export class NotificationsCommunication implements NotificationsCommunicationService {
  constructor(private router: Router) {}

  notificationNavigation(routing: NotificationRouting): void {
    const payloadId = (routing.data && routing.data.id) || '';
    const arrangementId = routing.data?.arrangementId;

    switch (routing['where-to']) {
      case 'conversation-view':
        this.router.navigate(['/more/messages/inbox/conversation', { id: payloadId }]);
        break;
      case 'transaction-view':
        this.router.navigate([
          '/my-accounts/transactions',
          { selectedAccount: arrangementId },
          'list',
          'detail',
          { transactionId: payloadId },
        ]);
        break;
      case 'arrangement-view':
        this.router.navigate(['/my-accounts/transactions', { selectedAccount: payloadId }, 'details']);
        break;
      default:
        console.warn('Route is not supported');
    }
  }

  openNotificationSettings() {
    this.router.navigate(['/self-service/product-list/manage-notifications']);
  }
}
