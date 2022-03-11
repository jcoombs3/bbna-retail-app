import { Component } from '@angular/core';
import { RemoteConfigService } from '@backbase/remote-config-ang';
import { RetailAppRemoteConfig } from '../../../remote-config/remote-config';
import { PERMISSIONS } from '../../auth/permissions';

@Component({
  selector: 'bb-mega-menu-nav-ui',
  templateUrl: './mega-menu-navigation.component.html',
})
export class MegaMenuNavComponent {
  permissions = PERMISSIONS;
  readonly showContacts = this.remoteConfig.getValue('show_contacts');

  constructor(private remoteConfig: RemoteConfigService<RetailAppRemoteConfig>) {}
}
