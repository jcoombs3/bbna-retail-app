import { NgModule } from '@angular/core';
import { MessagesClientInboxJourneyModule } from '@backbase/messages-client-inbox-journey-ang';

@NgModule({
  imports: [MessagesClientInboxJourneyModule.forRoot()],
})
export class MessagesClientInboxJourneyBundleModule {}
