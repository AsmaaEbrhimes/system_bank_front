import { MainPage } from './main-page/main-page';
import { Panel } from './Panel/Panel';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayingBills } from './paying-bills/paying-bills';
import { Cards } from './cards/cards';
import { Custmers } from './custmers/custmers';
import { Loans } from './loans/loans';
import { Notifications } from './notifications/notifications';
import { Transactions } from './transactions/transactions';
import { ShowInstallmentRelationsLoan } from './loans/show-installment-relations-loan/show-installment-relations-loan';
import { CustmerHaveAccounts } from './custmers/custmer-have-accounts/custmer-have-accounts';
{
}

const routes: Routes = [
  {
    path: '',
    component: Panel,
    children: [
      { path: '', component: MainPage },
      { path: 'paying_bills', component: PayingBills },
      { path: 'cards', component: Cards },
      { path: 'custmers', component: Custmers },
      { path: 'Account_custmers/:id', component: CustmerHaveAccounts },
      { path: 'loans', component: Loans },
      { path: 'notifications', component: Notifications },
      { path: 'transactions', component: Transactions },
      { path: 'installments_relation_loan/:id', component: ShowInstallmentRelationsLoan },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
