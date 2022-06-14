import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { GeneralComponent } from './components/general/general.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: DetailComponent,
  },
  {
    path: 'new',
    component: DetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
