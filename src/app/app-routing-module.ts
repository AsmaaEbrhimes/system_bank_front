import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Modules/auth/auth-module').then((m) => m.AuthModule),
  },

  {
    path: 'ContentDashboard',
    loadChildren: () =>
      import('./Modules/dashboard/dashboard-module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
