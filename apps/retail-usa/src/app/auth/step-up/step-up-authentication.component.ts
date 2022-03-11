import {
  Component,
  ViewChildren,
  ElementRef,
  QueryList,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bb-step-up-authentication',
  templateUrl: 'step-up-authentication.component.html',
})
export class StepUpAuthenticationComponent implements AfterViewInit {
  hostRef: StepUpAuthenticationComponent = this;
  defaultMockChallenge = 95244650;

  @ViewChildren('char', { read: ElementRef })
  chars?: QueryList<any>;
  charInputs?: ElementRef[] = [];
  passwordSize = 4;
  charsArray: number[] = Array.from(Array(this.passwordSize).keys());
  isPinInValid = false;
  readonly modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
  };

  @Input() isOpen = false;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() complete = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.chars) {
      this.charInputs = this.chars.toArray();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.cdRef.detectChanges();
    this.onClose();
  }

  onConfirm(form: NgForm) {
    let challengeString = '';
    for (const key in form.value) {
      // eslint-disable-next-line no-prototype-builtins
      if (form.value.hasOwnProperty(key)) {
        challengeString += form.value[key];
      }
    }
    const mockChallenge = challengeString === '1234' ? this.defaultMockChallenge : challengeString;

    this.complete.emit(`mock challenge="${mockChallenge}"`);
    this.cdRef.detectChanges();
    form.reset();
    this.onClose();
  }

  private onClose() {
    this.isOpen = false;
  }

  open(responseError: HttpErrorResponse) {
    const header = responseError.headers.get('WWW-Authenticate');
    if (header && (header as string).indexOf('invalid_pin') > -1) {
      this.isPinInValid = true;
    }

    this.isOpen = true;
    this.cdRef.detectChanges();
  }

  onInput(index: number) {
    if (this.charInputs && this.charInputs.length - 1 > index) {
      const current = this.charInputs[index].nativeElement;
      const next = this.charInputs[index + 1].nativeElement;
      if (current.value) {
        next.focus();
      }
    }
  }
}
