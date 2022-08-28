import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationCancel,
  NavigationError,
  NavigationEnd,
  Event as IRouterEvent,
} from '@angular/router';

import {
  ThemeService,
  ToastrService,
  OnlineStatusType,
  OnlineStatusService,
} from '@app/shared/services';
import { SpinnerService } from '@app/shared/components/spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string = 'angular-boilerplate';
  constructor(
    private readonly router: Router,
    private readonly themeService: ThemeService,
    private readonly toastrService: ToastrService,
    private readonly spinnerService: SpinnerService,
    private readonly onlineStatusService: OnlineStatusService
  ) {
    this.initConnectionStatus();
  }

  public ngOnInit(): void {
    this.themeService.load();
    this.routerNavigation();
  }

  private routerNavigation(): void {
    this.router.events.subscribe((event: IRouterEvent) => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show();
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.spinnerService.hide();
      }
    });
  }

  private initConnectionStatus(): void {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      if (status === OnlineStatusType.OFFLINE) {
        this.toastrService.warning('Offline', 'Internet connection lost');
      }
      if (status === OnlineStatusType.ONLINE) {
        this.toastrService.success('Online', 'Internet connection back');
      }
    });
  }
}
