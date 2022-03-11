export const PERMISSIONS = {
  canCreateA2A: 'Payments.A2ATransfer.create',
  canViewMyAccounts: 'ProductSummary.ProductSummary.view OR ProductSummary.ProductSummary.edit',
  canViewTransfers:
    'Payments.A2ATransfer.view OR Payments.SEPACT.view OR Payments.A2ATransfer.view OR Payments.SEPACT.view AND ProductSummary.ProductSummary.view',
  canViewMakeTransfer: 'Payments.A2ATransfer.view OR Payments.SEPACT.view AND ProductSummary.ProductSummary.view',
  canViewTransferToMember: 'Payments.A2ATransfer.view OR Payments.SEPACT.view AND ProductSummary.ProductSummary.view',
  canViewTransferToSomeone: 'Payments.A2ATransfer.view OR Payments.SEPACT.view AND ProductSummary.ProductSummary.view',
  canViewScheduledTransfers: 'Payments.A2ATransfer.view OR Payments.SEPACT.view',
  canViewConnectedAccounts: 'Payments.A2ATransfer.view',
  canViewBillPay:
    'Contacts.USBillpayPayees.view OR Payments.USBillpayPayments.view AND Contacts.USBillpayPayees-Search.execute AND Contacts.USBillpayPayees-Summary.view',
  canViewPayABill: 'Contacts.USBillpayPayees.view OR Payments.USBillpayPayments.view',
  canViewPendingPayments: 'Payments.USBillpayPayments.view',
  canViewHistoryPayments: 'Payments.USBillpayPayments.view',
  canViewTransactionsAnalytics: 'Transactions.Transactions.view',
  canViewSelfService:
    'Notifications.ManageNotifications.view AND ProductSummary.ProductSummary.view OR UserProfiles.ManageUserProfiles.view OR User.ManageAuthorizedUsers.view OR PersonalFinanceManagement.ManageCards.view OR Payments.StopChecks.view OR AccountStatements.ManageStatements.view',
  canViewMyProfile: 'UserProfiles.ManageUserProfiles.view',
  canViewAuthorizedUsers: 'User.ManageAuthorizedUsers.view',
  canViewManageCards: 'PersonalFinanceManagement.ManageCards.view',
  canViewManageNotifications:
    'Notifications.ManageNotifications.view AND ProductSummary.ProductSummary.view AND Actions.ManageActionRecipes.view',
  canViewManageContacts: 'Contacts.Contacts.view AND Contacts.Contacts.create',
  canViewStopChecks: 'Payments.StopChecks.view',
  canViewDownloadStatements: 'AccountStatements.ManageStatements.view',
  canViewMoreLinks:
    'PersonalFinanceManagement.ManageBudgets.view OR MessageCenter.ManageMessages.view OR PersonalFinanceManagement.Places.view',
  canViewBudgets: 'PersonalFinanceManagement.ManageBudgets.view',
  canViewMessages: 'MessageCenter.ManageMessages.view',
  canViewPlaces: 'MessageCenter.ManageMessages.view',
};
