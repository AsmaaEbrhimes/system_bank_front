import { MainPage } from './main-page/main-page';
import { Panel } from './Panel/Panel';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayingBills } from './paying-bills/paying-bills';
{
}

const routes: Routes = [
  {
    path: '',
    component: Panel,
    children: [
      { path: '', component: MainPage },
      { path: 'paying_bills', component: PayingBills },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
