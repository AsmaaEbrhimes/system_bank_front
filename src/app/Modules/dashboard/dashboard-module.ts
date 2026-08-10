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
  ],
  imports: [CommonModule, DashboardRoutingModule, SvgIconComponent, DatePickerModule, SharedModule],
})
export class DashboardModule {}
