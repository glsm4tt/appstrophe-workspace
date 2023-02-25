import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  HostListener,
  Injector,
  inject,
  EventEmitter,
  Output,
  Renderer2
} from "@angular/core";
import {
  Overlay,
  OverlayRef
} from "@angular/cdk/overlay";

import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ComponentPortal } from "@angular/cdk/portal";
import { DATA_TOKEN, PopoverContainerComponent } from "./popover.component";
import { ModalService } from "../modal/modal.service";

@Directive({
  selector: "[appsPopover]"
})
export class PopoverDirective implements OnDestroy, OnInit {
  @Input()
  popoverContent!: TemplateRef<object>;

  @Output()
  popoverAttached = new EventEmitter<OverlayRef>();

  @Output()
  popoverDetached = new EventEmitter<OverlayRef>();

  private unsubscribe = new Subject<void>();
  private overlayRef!: OverlayRef;

  private _overlay: Overlay = inject(Overlay);
  private _vcr: ViewContainerRef = inject(ViewContainerRef);
  private _modalService: ModalService = inject(ModalService);
  private _renderer: Renderer2 = inject(Renderer2);

  constructor(private _elementRef: ElementRef){
    // empty
  }

  ngOnInit(): void {
    this.createOverlay();

    this._modalService.overlayRef
      .attachments()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
          this.detachOverlay();
      });
  }

  ngOnDestroy(): void {
    this.detachOverlay();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  @HostListener("click") click() {
    this.attachOverlay();
  }

  private createOverlay(): void {
    const scrollStrategy = this._overlay.scrollStrategies.block();
    const positionStrategy = this._overlay.position().flexibleConnectedTo(this._elementRef)
    .withPositions([{
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 6, 
    }]);

    this.overlayRef = this._overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      width: this._elementRef.nativeElement.offsetWidth,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
          this.detachOverlay();
      });
  }

  private attachOverlay(): void {
    if (!this.overlayRef.hasAttached()) {
      const portalInjector = Injector.create({
        providers: [{provide: DATA_TOKEN, useValue: this.popoverContent}]
      });
      const comp = new ComponentPortal(PopoverContainerComponent, this._vcr, portalInjector);
      
      this.overlayRef.attach(comp);
      this.popoverAttached.emit(this.overlayRef);
      this._renderer.addClass(this._elementRef.nativeElement, 'popover-active');
    }
  }

  public detachOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.popoverDetached.emit(this.overlayRef);
      this._renderer.removeClass(this._elementRef.nativeElement, 'popover-active');
    }
  }
}
