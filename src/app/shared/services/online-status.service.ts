import { EventEmitter, Injectable, OnDestroy } from '@angular/core';

export enum OnlineStatusType {
  OFFLINE = 0,
  ONLINE = 1,
}

@Injectable()
export class OnlineStatusService implements OnDestroy {
  public status: EventEmitter<OnlineStatusType> =
    new EventEmitter<OnlineStatusType>(true);
  static EVENT_TYPE_ONLINE: string = 'online';
  static EVENT_TYPE_OFFLINE: string = 'offline';

  constructor() {
    this.bind();

    window.addEventListener(
      OnlineStatusService.EVENT_TYPE_ONLINE,
      this.onOnline
    );
    window.addEventListener(
      OnlineStatusService.EVENT_TYPE_OFFLINE,
      this.onOffline
    );
  }

  public ngOnDestroy(): void {
    window.removeEventListener(
      OnlineStatusService.EVENT_TYPE_ONLINE,
      this.onOnline
    );
    window.removeEventListener(
      OnlineStatusService.EVENT_TYPE_OFFLINE,
      this.onOffline
    );
  }

  public getStatus(): OnlineStatusType {
    if (navigator.onLine) {
      return OnlineStatusType.ONLINE;
    }
    return OnlineStatusType.OFFLINE;
  }

  private bind(): void {
    this.onOnline = this.onOnline.bind(this);
    this.onOffline = this.onOffline.bind(this);
  }

  private onOnline(): void {
    this.status.emit(OnlineStatusType.ONLINE);
  }

  private onOffline(): void {
    this.status.emit(OnlineStatusType.OFFLINE);
  }
}
