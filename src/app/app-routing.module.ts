import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteConstants } from '@app/core';

const routes: Routes = [
  {
    path: RouteConstants.ROOT,
    pathMatch: 'full',
    redirectTo: RouteConstants.AUTH,
  },
  {
    path: RouteConstants.AUTH,
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: RouteConstants.USER,
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserModule),
  },
  { path: RouteConstants.NOT_FOUND, redirectTo: RouteConstants.ROOT },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
