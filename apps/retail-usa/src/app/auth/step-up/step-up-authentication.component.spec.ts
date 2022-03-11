import { ChangeDetectorRef, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackbaseCoreModule } from '@backbase/foundation-ang/core';
import { StepUpAuthenticationComponent } from './step-up-authentication.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

describe('StepUpAuthenticationComponent', () => {
  let component: StepUpAuthenticationComponent;
  let fixture: ComponentFixture<StepUpAuthenticationComponent>;
  beforeEach(() => {
    const changeDetectorRefStub = { detectChanges: () => ({}) };
    const elementRefStub = { nativeElement: { contains: () => ({}) } };

    TestBed.configureTestingModule({
      imports: [BackbaseCoreModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StepUpAuthenticationComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectorRefStub },
        { provide: ElementRef, useValue: elementRefStub },
      ],
    });
    fixture = TestBed.createComponent(StepUpAuthenticationComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('should open modal on open call', () => {
    const response = new HttpErrorResponse({});
    component.isOpen = false;
    component.open(response);
    expect(component.isOpen).toBeTruthy();
  });
  it('should close modal on cancel', () => {
    component.isOpen = true;
    component.onCancel();
    expect(component.isOpen).toBeFalsy();
  });
  it('should focus on next field when onInput() is called', () => {
    const mockFirstElementRef = <ElementRef>{
      nativeElement: <any>{
        value: '0',
        focus: () => {},
      },
    };
    const mockSecondElementRef = <ElementRef>{
      nativeElement: <any>{
        value: '',
        focus: () => {},
      },
    };
    component.charInputs = [mockFirstElementRef, mockSecondElementRef];
    spyOn(mockSecondElementRef.nativeElement, 'focus');
    component.onInput(0);
    expect(mockSecondElementRef.nativeElement.focus).toHaveBeenCalled();
  });
  it('should perform expected actions when onConfirm() is called', () => {
    const mockForm = <NgForm>{
      value: {
        char0: '0',
        char1: '1',
        char2: '2',
        char3: '3',
      },
      reset: () => {},
    };
    component.isOpen = true;
    spyOn(component.complete, 'emit');
    spyOn(mockForm, 'reset');
    component.onConfirm(mockForm);
    expect(component.isOpen).toBeFalsy();
    expect(component.complete.emit).toHaveBeenCalledWith('mock challenge="0123"');
  });
});
