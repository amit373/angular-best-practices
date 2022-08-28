import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ComponentsModule } from '@app/shared';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, ComponentsModule],
})
export class UserModule {}
