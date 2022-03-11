import { Component } from '@angular/core';
import { UserContextService } from '../user-context.service';

@Component({
  templateUrl: './select-context.component.html',
})
export class SelectContextComponent {
  constructor(public readonly userContextService: UserContextService) {}
}
