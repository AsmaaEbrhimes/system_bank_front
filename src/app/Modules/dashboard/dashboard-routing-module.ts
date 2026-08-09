import { MainPage } from './main-page/main-page';
import { Panel } from './Panel/Panel';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
{}

const routes: Routes = [
  {
    path:"",component:Panel,
    children:[
      {path:"",component:MainPage}
    ]



  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
