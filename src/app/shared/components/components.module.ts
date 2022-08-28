import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

const components: any[] | Type<any> = [];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [CommonModule],
})
export class ComponentsModule {}
