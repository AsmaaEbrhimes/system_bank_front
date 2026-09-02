import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { SideNav } from './side-nav/side-nav';
import { Panel } from './Panel/Panel';
import { MainPage } from './main-page/main-page';
import { SummaryCard } from './main-page/summary-card/summary-card';
import { DatePickerModule } from 'primeng/datepicker';
import { SparklineChart } from './main-page/summary-card/sparkline-chart/sparkline-chart';
import { TabelTransations } from './main-page/tabel-transations/tabel-transations';
import { SharedModule } from '../../shared/shared-module';
import { Header } from './header/header';
import { PayingBills } from './paying-bills/paying-bills';
import { SelectModule } from 'primeng/select';
import { BillingMetrics } from './paying-bills/billing-metrics/billing-metrics';
import { Cards } from './cards/cards';
import { Custmers } from './custmers/custmers';
import { Loans } from './loans/loans';
import { Notifications } from './notifications/notifications';
import { Transactions } from './transactions/transactions';
import { CreatePaying } from './paying-bills/create-paying/create-paying';
import { DialogService } from 'primeng/dynamicdialog';
@NgModule({
  declarations: [
    SideNav,
    Panel,
    MainPage,
    SummaryCard,
    SparklineChart,
    TabelTransations,
    Header,
    PayingBills,
    BillingMetrics,
    Cards,
    Custmers,
    Loans,
    Notifications,
    Transactions,
    CreatePaying,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SvgIconComponent,
    DatePickerModule,
    SharedModule,
    SelectModule,
  ],
  providers: [DialogService],
})
export class DashboardModule {}
