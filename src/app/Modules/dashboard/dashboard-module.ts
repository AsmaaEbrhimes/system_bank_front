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

@NgModule({
  declarations: [SideNav, Panel, MainPage, SummaryCard, SparklineChart, TabelTransations],
  imports: [CommonModule, DashboardRoutingModule, SvgIconComponent, DatePickerModule],
})
export class DashboardModule {}
