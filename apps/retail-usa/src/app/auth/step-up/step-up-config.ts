import { HttpErrorResponse } from '@angular/common/http';
import { StepUpAuthenticationComponent } from './step-up-authentication.component';

const StepUpResponseHeaderValue = 'mock challenge';
const StepUpResponseHeaderAttribute = 'WWW-Authenticate';
const StepUpResponseHeaderStatus = 401;

export function interceptResponses(responseError: HttpErrorResponse): boolean {
  return (
    responseError.status === StepUpResponseHeaderStatus &&
    responseError.headers.get(StepUpResponseHeaderAttribute) !== null &&
    (responseError.headers.get(StepUpResponseHeaderAttribute) as string).indexOf(StepUpResponseHeaderValue) > -1
  );
}

export const StepUpConfig = {
  mediatorComponentClass: StepUpAuthenticationComponent,
  retryRequests: {
    headerAttribute: 'X-MFA',
  },
  interceptResponses,
};
