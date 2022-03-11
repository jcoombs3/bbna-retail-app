import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RoutableModalService } from './routable-modal.service';
import { RoutableModalOutletName, RoutableModalParamName } from './routable-modal.routes';

@Component({
  selector: 'bb-routable-modal-view',
  templateUrl: './routable-modal.component.html',
})
export class RoutableModalComponent implements OnDestroy, OnInit {
  /**
   * Modal Options
   */
  modalOptions?: NgbModalOptions;
  /**
   * Flag to show close button
   */
  closeButton = false;
  /**
   * Flag to show modal header
   */
  showHeader = true;
  /**
   * Modal Title
   */
  modalTitle = '';
  /**
   * Modal Title Icon
   */
  modalTitleIcon = '';
  /**
   * Modal heading type (h1-h6)
   */
  modalHeadingType = 'h2';

  readonly isModalOpen$ = new BehaviorSubject(false);
  readonly defaultModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg',
    animation: false,
    scrollable: false,
  };

  private subscription!: Subscription;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: RoutableModalService,
  ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      const modalName = params[RoutableModalParamName];

      if (modalName && !this.isModalOpen$.value) {
        const modalRoute = this.activatedRoute.children.find((child) => child.outlet === RoutableModalOutletName);
        const activatedModalChild = modalRoute?.routeConfig?.children?.find(
          (modalChild) => modalChild.path === modalName,
        );

        if (activatedModalChild) {
          const { modalTitle, modalTitleIcon, closeButton } = activatedModalChild?.data || {};

          this.modalTitle = modalTitle;
          this.modalTitleIcon = modalTitleIcon;
          this.closeButton = closeButton ?? this.closeButton;
          this.openModal(modalName);
        }
      } else if (this.isModalOpen$.value) {
        this.closeModal();
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  openModal(modalName: string) {
    this.isModalOpen$.next(true);
    this.router.navigate([{ outlets: { [RoutableModalOutletName]: [modalName] } }], {
      queryParamsHandling: 'merge',
      skipLocationChange: true,
    });
  }

  closeModal() {
    this.isModalOpen$.next(false);
    this.modalService.closeModal();
  }
}
