import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { ModalContainerComponent } from './modal.component';
import { first, Subject } from 'rxjs';
import { DATA_TOKEN } from '../popover';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public overlayRef!: OverlayRef;
  public onClose = new Subject<unknown>()

  private _overlay: Overlay = inject(Overlay);
   
  constructor() {
    const scrollStrategy = this._overlay.scrollStrategies.block();
    const positionStrategy = this._overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this._overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      //  width: this._elementRef.nativeElement.offsetWidth,
      backdropClass: 'cdk-overlay-dark-backdrop'
    });
  }

  open<C>(comp: ComponentType<C>) {
    if (!this.overlayRef.hasAttached()) {
      const portalInjector = Injector.create({
        providers: [{ provide: DATA_TOKEN, useValue: comp }]
      });

      const component = new ComponentPortal(ModalContainerComponent, null, portalInjector);

      this.overlayRef.attach(component);

      return {ref: this.overlayRef, onClose: this.onClose.asObservable().pipe(first()) }
    }
    return null;
  }

  close(param: unknown) {
    this.dismiss();
    this.onClose.next(param)
  }

  dismiss() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
