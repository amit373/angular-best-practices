import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHtmlPipeModule } from '@app/shared/pipes';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent],
  imports: [CommonModule, SafeHtmlPipeModule],
})
export class SpinnerModule {}
