import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { SideNav } from './side-nav/side-nav';
import { Panel } from './Panel/Panel';

@NgModule({
  declarations: [SideNav, Panel],
  imports: [CommonModule, DashboardRoutingModule ,  SvgIconComponent ],
})
export class DashboardModule {}
