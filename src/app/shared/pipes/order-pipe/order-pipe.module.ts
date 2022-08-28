import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPipe } from './order.pipe';

@NgModule({
  declarations: [OrderPipe],
  exports: [OrderPipe],
  imports: [CommonModule],
})
export class OrderPipeModule {}
