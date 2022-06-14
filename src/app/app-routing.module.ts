import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './features/main/components/general/general.component';
import { AuthGuardService } from './shared/services';

const routes: Routes = [
  {
    path: 'notes',
    loadChildren: () =>
      import('./features/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
