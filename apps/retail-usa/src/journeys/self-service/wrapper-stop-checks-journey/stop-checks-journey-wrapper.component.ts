import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bb-stop-checks-journey-wrapper',
  template: `
    <div class="bb-stack mb-3 pt-5">
      <div class="bb-stack__item bb-stack__item--fill">
        <bb-header-ui
          headingType="h1"
          heading-i18n="@@stop-checks-journey.title"
          [heading]="'Stop Checks'"
        ></bb-header-ui>
      </div>
      <div class="bb-stack__item">
        <button bbButton class="py-2" color="primary" buttonSize="sm" (click)="navigateToForm()">
          <bb-icon-ui name="add"></bb-icon-ui>
          <span i18n="@@stop-checks-journey.retail.title">Create</span>
        </button>
      </div>
    </div>
    <div class="card card-body">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class StopChecksJourneyWrapperComponent {
  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

  navigateToForm() {
    this.router.navigate(['list', 'form'], { relativeTo: this.route });
  }
}
