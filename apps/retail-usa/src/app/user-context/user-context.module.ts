import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContextRoutingModule } from './user-context-routing.module';
import { SelectContextComponent } from './select-context/select-context.component';
import { SelectContextWidgetModule } from '@backbase/select-context-widget-ang';

@NgModule({
  declarations: [SelectContextComponent],
  imports: [CommonModule, SelectContextWidgetModule, UserContextRoutingModule],
})
export class UserContextModule {}
