import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthService,
  UtilsService,
  ThemeService,
  LoaderService,
  ToastrService,
  StorageService,
  RestApiService,
  ResponsiveService,
  OnlineStatusService,
} from '@app/shared/services';

const services = [
  AuthService,
  UtilsService,
  ThemeService,
  LoaderService,
  ToastrService,
  StorageService,
  RestApiService,
  ResponsiveService,
  OnlineStatusService,
];

@NgModule({
  providers: [services],
  imports: [CommonModule],
})
export class ServicesModule {}
