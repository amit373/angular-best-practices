import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterOnlyDirectiveModule } from './character-only';
import { ImgFallbackDirectiveModule } from './img-fallback';
import { NumberOnlyDirectiveModule } from './number-only';

const directiveModules = [
  CharacterOnlyDirectiveModule,
  ImgFallbackDirectiveModule,
  NumberOnlyDirectiveModule,
];

@NgModule({
  exports: [directiveModules],
  imports: [CommonModule, directiveModules],
})
export class DirectivesModule {}
