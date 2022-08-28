import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterOnlyDirective } from './character-only.directive';

@NgModule({
  declarations: [CharacterOnlyDirective],
  exports: [CharacterOnlyDirective],
  imports: [CommonModule],
})
export class CharacterOnlyDirectiveModule {}
