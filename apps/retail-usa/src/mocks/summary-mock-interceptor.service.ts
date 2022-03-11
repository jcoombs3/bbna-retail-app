import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class SummaryMockInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      localStorage.getItem('enableMocks') === 'true' &&
      request.url.indexOf('/accessgroups/users/permissions/summary') !== -1 &&
      request.method === 'GET'
    ) {
      return of(new HttpResponse({ body: dumpFromWeb, status: 200 }));
    }

    return next.handle(request);
  }
}

const dumpFromWeb = [
  {
    additions: {},
    resource: 'Payments',
    function: 'A2A Transfer',
    permissions: {
      cancel: true,
      view: true,
      edit: true,
      approve: true,
      create: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Device',
    function: 'Manage Devices',
    permissions: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'User',
    function: 'Manage Users',
    permissions: {
      view: true,
    },
  },
  {
    additions: {},
    resource: 'Notifications',
    function: 'Manage Notifications',
    permissions: {
      create: true,
      view: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Message Center',
    function: 'Manage Messages',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Entitlements',
    function: 'Manage Data Groups',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      approve: true,
    },
  },
  {
    additions: {},
    resource: 'Limits',
    function: 'Manage Shadow Limits',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      approve: true,
    },
  },
  {
    additions: {},
    resource: 'Approvals',
    function: 'Manage Approval Policy and Level',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      approve: true,
    },
  },
  {
    additions: {},
    resource: 'Payments',
    function: 'Remote Deposit Capture',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Audit',
    function: 'Audit Emulation',
    permissions: {
      view: true,
    },
  },
  {
    additions: {},
    resource: 'Account Statements',
    function: 'Manage Statements',
    permissions: {
      view: true,
    },
  },
  {
    additions: {},
    resource: 'Payments',
    function: 'Stop Checks',
    permissions: {
      cancel: true,
      view: true,
      edit: true,
      approve: true,
      create: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Product Summary',
    function: 'Product Summary',
    permissions: {
      edit: true,
      view: true,
    },
  },
  {
    additions: {},
    resource: 'Billpay',
    function: 'US Billpay Enrolment',
    permissions: {
      execute: true,
      view: true,
    },
  },
  {
    additions: {},
    resource: 'Contacts',
    function: 'US Billpay Payees-Search',
    permissions: {
      execute: true,
    },
  },
  {
    additions: {},
    resource: 'Payments',
    function: 'US Domestic Wire',
    permissions: {
      cancel: true,
      view: true,
      edit: true,
      approve: true,
      create: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Payments',
    function: 'US Foreign Wire',
    permissions: {
      cancel: true,
      view: true,
      edit: true,
      approve: true,
      create: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Personal Finance Management',
    function: 'Manage Budgets',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Actions',
    function: 'Manage Action Recipes',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      execute: true,
    },
  },
  {
    additions: {},
    resource: 'Personal Finance Management',
    function: 'Places',
    permissions: {
      view: true,
    },
  },
  {
    additions: {},
    resource: 'Contacts',
    function: 'US Billpay Payees-Summary',
    permissions: {
      view: true,
    },
  },
  {
    additions: {},
    resource: 'Legal Entity',
    function: 'Manage Legal Entities',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      approve: true,
    },
  },
  {
    additions: {},
    resource: 'Contacts',
    function: 'US Billpay Payees',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Contacts',
    function: 'Contacts',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Service Agreement',
    function: 'Assign Users',
    permissions: {
      create: true,
      view: true,
      edit: true,
    },
  },
  {
    additions: {},
    resource: 'Entitlements',
    function: 'Manage Function Groups',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      approve: true,
    },
  },
  {
    additions: {},
    resource: 'Limits',
    function: 'Manage Limits',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      approve: true,
    },
  },
  {
    additions: {},
    resource: 'Transactions',
    function: 'Transactions',
    permissions: {
      edit: true,
      view: true,
    },
  },
  {
    additions: {},
    resource: 'Audit',
    function: 'Audit',
    permissions: {
      create: true,
      view: true,
    },
  },
  {
    additions: {},
    resource: 'Service Agreement',
    function: 'Assign Permissions',
    permissions: {
      create: true,
      view: true,
      edit: true,
      approve: true,
    },
  },
  {
    additions: {},
    resource: 'User',
    function: 'Manage Authorized Users',
    permissions: {
      create: true,
      view: true,
      edit: true,
    },
  },
  {
    additions: {},
    resource: 'Personal Finance Management',
    function: 'Manage Cards',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Service Agreement',
    function: 'Manage Service Agreements',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      approve: true,
    },
  },
  {
    additions: {},
    resource: 'Personal Finance Management',
    function: 'Manage Pockets',
    permissions: {
      create: true,
      view: true,
      edit: true,
      execute: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'User Profiles',
    function: 'Manage User Profiles',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Limits',
    function: 'Manage Global Limits',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      approve: true,
    },
  },
  {
    additions: {},
    resource: 'Arrangements',
    function: 'US Billpay Accounts',
    permissions: {
      view: true,
    },
  },
  {
    additions: {},
    resource: 'Payments',
    function: 'P2P Transfer',
    permissions: {
      cancel: true,
      view: true,
      edit: true,
      approve: true,
      create: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Payments',
    function: 'US Billpay Payments',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
    },
  },
  {
    additions: {},
    resource: 'Approvals',
    function: 'Assign Approval Policies',
    permissions: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      approve: true,
    },
  },
  {
    additions: {},
    resource: 'Actions',
    function: 'Access Actions History',
    permissions: {
      execute: true,
      view: true,
    },
  },
];
