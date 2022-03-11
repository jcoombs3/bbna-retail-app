import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserContextService {
  public getRedirectPage(redirectProtocol: string = 'spa') {
    return `${redirectProtocol}:${environment.landingPageUrl}`;
  }
}
