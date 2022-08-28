import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { THEME } from '@app/core/constants';
import { StorageService } from './storage.service';

export interface Theme {
  name: string;
  icon: string;
}

type ITheme = 'light' | 'dark';

@Injectable()
export class ThemeService {
  private renderer: Renderer2;
  private colorScheme: string | undefined;
  private colorSchemePrefix: string = 'color-scheme-';

  constructor(
    private readonly rendererFactory: RendererFactory2,
    private readonly storageService: StorageService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  private detectPrefersColorScheme(): void {
    if (window.matchMedia('(theme-scheme)').media !== 'not all') {
      this.colorScheme = window.matchMedia(`(theme-scheme: ${THEME.DARK})`)
        .matches
        ? THEME.DARK
        : THEME.LIGHT;
    } else {
      this.colorScheme = THEME.LIGHT;
    }
    this.storageService.saveToLocalStorage(THEME.KEY, this.colorScheme, false);
  }

  public setColorScheme(scheme: ITheme): void {
    this.colorScheme = scheme;
    this.storageService.saveToLocalStorage(THEME.KEY, scheme, false);
  }

  public getColorScheme(): void {
    if (this.storageService.getFromLocalStorage(THEME.KEY, false)) {
      this.colorScheme = this.storageService.getFromLocalStorage(
        THEME.KEY,
        false
      );
    } else {
      this.detectPrefersColorScheme();
    }
  }

  public load(): void {
    this.getColorScheme();
    this.renderer.addClass(
      document.body,
      this.colorSchemePrefix + this.colorScheme
    );
  }

  public update(scheme: ITheme): void {
    this.setColorScheme(scheme);
    this.renderer.removeClass(
      document.body,
      this.colorSchemePrefix +
        (this.colorScheme === THEME.DARK ? THEME.LIGHT : THEME.DARK)
    );
    this.renderer.addClass(document.body, this.colorSchemePrefix + scheme);
  }

  public currentActive(): string {
    return this.colorScheme!;
  }
}
