import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DirectivesModule } from '@app/shared/directives';
import { PipesModule } from '@app/shared/pipes';
import { ComponentsModule } from '@app/shared/components';
import { ServicesModule } from '@app/shared/services';

const modules = [
  HttpClientModule,
  DirectivesModule,
  PipesModule,
  ComponentsModule,
  ServicesModule,
];

@NgModule({
  imports: [modules, CommonModule],
  exports: [modules],
  providers: [ServicesModule],
})
export class SharedModule {}
