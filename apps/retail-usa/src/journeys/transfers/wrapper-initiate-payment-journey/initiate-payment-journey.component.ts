import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bb-initiate-payment-journey-wrapper',
  template: `
    <div class="pb-1 pt-5">
      <h1 class="pt-3 pb-4">{{ title }}</h1>
    </div>
    <div class="card card-body">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class InitiatePaymentJourneyWrapperComponent implements OnInit {
  title!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.data.modalTitle;
  }
}
