import { Panel } from './Panel/Panel';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
{}

const routes: Routes = [
  {path:"",component:Panel}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
