import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHtmlPipeModule } from './safe-html';
import { FilterPipeModule } from './filter-pipe';
import { OrderPipeModule } from './order-pipe';
import { TimeElapsedPipeModule } from './time-elapsed';

const pipesModules = [
  SafeHtmlPipeModule,
  FilterPipeModule,
  OrderPipeModule,
  TimeElapsedPipeModule,
];

@NgModule({
  declarations: [],
  exports: [pipesModules],
  imports: [CommonModule, pipesModules],
})
export class PipesModule {}
