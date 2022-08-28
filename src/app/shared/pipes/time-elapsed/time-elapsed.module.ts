import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeElapsedPipe } from './time-elapsed.pipe';

@NgModule({
  declarations: [TimeElapsedPipe],
  exports: [TimeElapsedPipe],
  imports: [CommonModule],
})
export class TimeElapsedPipeModule {}
