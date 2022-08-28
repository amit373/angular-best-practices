import { Injectable } from '@angular/core';
import {
  ToastrService as NgxToastrService,
  IndividualConfig,
} from 'ngx-toastr';

@Injectable()
export class ToastrService {
  private config: Partial<IndividualConfig> = {
    tapToDismiss: true,
    enableHtml: false,
    closeButton: false,
    newestOnTop: true,
    disableTimeOut: false,
    timeOut: 3000,
    extendedTimeOut: 300,
    easeTime: 300,
    progressBar: false,
    progressAnimation: 'decreasing',
    onActivateTick: false,
  };
  constructor(private readonly ngxToastrService: NgxToastrService) {}

  public get toastr(): NgxToastrService {
    return this.ngxToastrService;
  }

  public success(
    message: string = '',
    title: string = '',
    config?: Partial<IndividualConfig>
  ): void {
    this.ngxToastrService.success(message, title, {
      ...this.config,
      ...(config ? { ...config } : this.config),
    });
  }

  public error(
    message: string = '',
    title: string = '',
    config?: Partial<IndividualConfig>
  ): void {
    this.ngxToastrService.error(message, title, {
      ...this.config,
      ...(config ? { ...config } : this.config),
    });
  }

  public info(
    message: string = '',
    title: string = '',
    config?: Partial<IndividualConfig>
  ): void {
    this.ngxToastrService.info(message, title, {
      ...this.config,
      ...(config ? { ...config } : this.config),
    });
  }

  public warning(
    message: string = '',
    title: string = '',
    config?: Partial<IndividualConfig>
  ): void {
    this.ngxToastrService.warning(message, title, {
      ...this.config,
      ...(config ? { ...config } : this.config),
    });
  }
}
