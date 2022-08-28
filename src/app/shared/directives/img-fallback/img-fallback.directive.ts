import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[srcFallback]',
})
export class ImgFallbackDirective implements OnDestroy {
  @Input('srcFallback') imgSrc!: string;
  @Output() loaded = new EventEmitter<boolean>();
  private nativeElement: HTMLElement;
  private isApplied: boolean = false;
  private ERROR_EVENT_TYPE: string = 'error';
  private LOAD_EVENT_TYPE: string = 'load';
  private cancelOnError!: Function;
  private cancelOnLoad!: Function;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {
    this.nativeElement = el.nativeElement;

    this.onError = this.onError.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.addEvents();
  }

  private onError(): void {
    if (this.nativeElement.getAttribute('src') !== this.imgSrc) {
      this.isApplied = true;
      this.renderer.setAttribute(this.nativeElement, 'src', this.imgSrc);
    } else {
      this.removeOnLoadEvent();
    }
  }

  private onLoad(): void {
    this.loaded.emit(this.isApplied);
  }

  private removeErrorEvent(): void {
    if (this.cancelOnError) {
      this.cancelOnError();
    }
  }

  private removeOnLoadEvent(): void {
    if (this.cancelOnLoad) {
      this.cancelOnLoad();
    }
  }

  private addEvents(): void {
    this.cancelOnError = this.renderer.listen(
      this.nativeElement,
      this.ERROR_EVENT_TYPE,
      this.onError
    );
    this.cancelOnLoad = this.renderer.listen(
      this.nativeElement,
      this.LOAD_EVENT_TYPE,
      this.onLoad
    );
  }

  public ngOnDestroy(): void {
    this.removeErrorEvent();
    this.removeOnLoadEvent();
  }
}
