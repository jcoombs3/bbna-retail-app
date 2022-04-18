/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an array named
 * `mockProviders`.
 *
 *
 */
import { Provider } from '@angular/core';
import { TemplateRegistry } from '@backbase/foundation-ang/core';
import { createMocks, createMocksInterceptor } from '@backbase/foundation-ang/data-http';
import { ContactsHttpServiceMocksProvider } from '@backbase/data-ang/contact-manager';
import { PaymentOrdersHttpServiceMocksProvider } from '@backbase/data-ang/payment-order';
import { A2aClientHttpServiceMocksProvider } from '@backbase/data-ang/payment-order-a2a';
import {
  CategoryPeriodTotalsHttpServiceMocksProvider,
  CategoryTotalsHttpServiceMocksProvider,
  TransactionClientHttpServiceMocksProvider,
  TurnoversHttpServiceMocksProvider,
} from '@backbase/data-ang/transactions';
import { PlacesHttpServiceMocksProvider } from '@backbase/data-ang/places';
import { NotificationsMocksProvider } from '@backbase/notifications-mocks-provider-ang';
import { MessagecenterHttpServiceMocksProvider } from '@backbase/data-ang/messages';
import { CardsHttpServiceMocksProvider, TravelNoticesHttpServiceMocksProvider } from '@backbase/data-ang/cards';
import {
  IdentityManagementServiceMocksProvider,
  UserManagementServiceMocksProvider,
  UserProfileManagementServiceMocksProvider,
} from '@backbase/data-ang/user';
import {
  ManageMyDevicesServiceMocksProvider,
  ManageOtherUsersDevicesServiceMocksProvider,
} from '@backbase/data-ang/device';
import {
  ConsentsHttpServiceMocksProvider,
  PaymentRequestsHttpServiceMocksProvider,
  ConsentRequestsHttpServiceMocksProvider,
} from '@backbase/data-ang/consent';
import { SavinggoalsHttpServiceMocksProvider } from '@backbase/data-ang/saving-goals';
import { SelfEnrollmentServiceMocksProvider } from '@backbase/data-ang/self-enrollment';
import { AccountStatementHttpServiceMocksProvider } from '@backbase/data-ang/account-statements';
import { BudgetsHttpServiceMocksProvider } from '@backbase/data-ang/budgeting';
import { CategoriesHttpServiceMocksProvider } from '@backbase/data-ang/categories-management';
import {
  AccountsHttpServiceMocksProvider,
  ArrangementsHttpServiceMocksProvider,
  BalancesHttpServiceMocksProvider,
  ProductKindsHttpServiceMocksProvider,
  ProductSummaryHttpServiceMocksProvider,
} from '@backbase/data-ang/arrangements';
import {
  BillPayAccountsServiceMocksProvider,
  BillPayAutopayServiceMocksProvider,
  BillPayEbillsServiceMocksProvider,
  BillPayEnrolmentServiceMocksProvider,
  BillPayPayeesServiceMocksProvider,
  BillPayPayeesSummaryServiceMocksProvider,
  BillPayPaymentsServiceMocksProvider,
  BillPayPayverisServiceMocksProvider,
  BillPaySearchServiceMocksProvider,
} from '@backbase/data-ang/billpay';
import {
  ActionRecipesHttpServiceMocksProvider,
  ActionRecipeSpecificationsHttpServiceMocksProvider,
} from '@backbase/data-ang/actions';
import { StopChecksHttpServiceMocksProvider } from '@backbase/data-ang/stop-checks';
import { NotificationsHttpServiceMocksProvider } from '@backbase/data-ang/notifications';
import { AuthorizedUserServiceMocksProvider } from '@backbase/data-ang/authorized-users';
import {
  ServiceAgreementHttpServiceMocksProvider,
  ServiceAgreementsHttpServiceMocksProvider,
  UsersHttpServiceMocksProvider,
  UsersHttpServiceGetUserPrivilegesMocksProvider,
  UsersHttpServiceGetUsersByPermissionsMocksProvider,
  UsersHttpServiceGetDataItemPermissionsContextMocksProvider,
  UsersHttpServiceGetCheckUserPermissionMocksProvider,
  UsersHttpServiceGetArrangementUserPrivilegesMocksProvider,
} from '@backbase/data-ang/accesscontrol';
import { PaymentTemplatesHttpServiceMocksProvider } from '@backbase/data-ang/payment-template';
import { productSummaryContextArrangementsMocks } from './mock-data';
import { SummaryMockInterceptor } from '../mocks/summary-mock-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FinancialInstitutionManagerClientHttpServiceMocksProvider } from '@backbase/data-ang/financial-institution-manager';
import { RestrictedDatesHttpServiceMocksProvider } from '@backbase/transfers-dates-http-ang';

const ProductSummaryContextArrangementsMockProvider = createMocks([
  {
    urlPattern: '{version}/productsummary/context/arrangements',
    method: 'GET',
    responses: [
      {
        status: 200,
        body: productSummaryContextArrangementsMocks,
      },
    ],
  },
]);

/**
 * Mock providers for Backbase services used when running the app in dev mode.
 */

export const mockProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SummaryMockInterceptor,
    multi: true,
  },
  createMocksInterceptor(),
  NotificationsMocksProvider,
  ProductSummaryContextArrangementsMockProvider,
  AccountsHttpServiceMocksProvider,
  ArrangementsHttpServiceMocksProvider,
  BalancesHttpServiceMocksProvider,
  ProductKindsHttpServiceMocksProvider,
  ProductSummaryHttpServiceMocksProvider,
  TransactionClientHttpServiceMocksProvider,
  PaymentOrdersHttpServiceMocksProvider,
  A2aClientHttpServiceMocksProvider,
  ContactsHttpServiceMocksProvider,
  PlacesHttpServiceMocksProvider,
  TemplateRegistry,
  AccountsHttpServiceMocksProvider,
  MessagecenterHttpServiceMocksProvider,
  CardsHttpServiceMocksProvider,
  IdentityManagementServiceMocksProvider,
  UserManagementServiceMocksProvider,
  UserProfileManagementServiceMocksProvider,
  ManageMyDevicesServiceMocksProvider,
  ManageOtherUsersDevicesServiceMocksProvider,
  ConsentsHttpServiceMocksProvider,
  SavinggoalsHttpServiceMocksProvider,
  SelfEnrollmentServiceMocksProvider,
  AccountStatementHttpServiceMocksProvider,
  BudgetsHttpServiceMocksProvider,
  CategoriesHttpServiceMocksProvider,
  BillPayAccountsServiceMocksProvider,
  BillPayAutopayServiceMocksProvider,
  BillPayEbillsServiceMocksProvider,
  BillPayEnrolmentServiceMocksProvider,
  BillPayPayeesServiceMocksProvider,
  BillPayPayeesSummaryServiceMocksProvider,
  BillPayPaymentsServiceMocksProvider,
  BillPayPayverisServiceMocksProvider,
  BillPaySearchServiceMocksProvider,
  ActionRecipesHttpServiceMocksProvider,
  ActionRecipeSpecificationsHttpServiceMocksProvider,
  StopChecksHttpServiceMocksProvider,
  NotificationsHttpServiceMocksProvider,
  AuthorizedUserServiceMocksProvider,
  ServiceAgreementHttpServiceMocksProvider,
  ServiceAgreementsHttpServiceMocksProvider,
  TurnoversHttpServiceMocksProvider,
  CategoryPeriodTotalsHttpServiceMocksProvider,
  CategoryTotalsHttpServiceMocksProvider,
  TravelNoticesHttpServiceMocksProvider,
  PaymentRequestsHttpServiceMocksProvider,
  ConsentRequestsHttpServiceMocksProvider,
  UsersHttpServiceMocksProvider,
  UsersHttpServiceGetUserPrivilegesMocksProvider,
  UsersHttpServiceGetUsersByPermissionsMocksProvider,
  UsersHttpServiceGetDataItemPermissionsContextMocksProvider,
  UsersHttpServiceGetCheckUserPermissionMocksProvider,
  UsersHttpServiceGetArrangementUserPrivilegesMocksProvider,
  PaymentTemplatesHttpServiceMocksProvider,
  FinancialInstitutionManagerClientHttpServiceMocksProvider,
  RestrictedDatesHttpServiceMocksProvider
];
