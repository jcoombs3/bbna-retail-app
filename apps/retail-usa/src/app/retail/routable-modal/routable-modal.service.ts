import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutableModalOutletName, RoutableModalParamName } from './routable-modal.routes';

@Injectable({
  providedIn: 'root',
})
export class RoutableModalService {
  constructor(private readonly router: Router) {}

  openModal(modalName: string) {
    if (modalName) {
      this.router.navigate([], {
        queryParams: { [RoutableModalParamName]: modalName },
        queryParamsHandling: 'merge',
      });
    }
  }

  closeModal() {
    this.router.navigate([{ outlets: { [RoutableModalOutletName]: [] } }], {
      queryParams: { [RoutableModalParamName]: undefined },
      queryParamsHandling: 'merge',
    });
  }
}
