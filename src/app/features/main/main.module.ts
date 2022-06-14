import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { GeneralComponent } from './components/general/general.component';

import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/shared/components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DetailComponent } from './components/detail/detail.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [GeneralComponent, DetailComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatTabsModule,
    ComponentsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatSelectModule,
  ],
})
export class MainModule {}
