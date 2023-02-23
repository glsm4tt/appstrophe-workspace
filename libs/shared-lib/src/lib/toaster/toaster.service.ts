import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { ToasterComponent } from './toaster.component';
import { DATA_TOKEN } from '../popover';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  public overlayRef!: OverlayRef;

  private _overlay: Overlay = inject(Overlay);
   
  constructor() {
    const scrollStrategy = this._overlay.scrollStrategies.block();
    const positionStrategy = this._overlay.position()
      .global()
      .centerHorizontally()
      .bottom('1rem');

    this.overlayRef = this._overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }

  open(message: string, type: 'success' | 'danger' | 'warning' | 'default' = 'default', timeout: number = 5000) {
    if (!this.overlayRef.hasAttached()) {
      const portalInjector = Injector.create({
        providers: [{ provide: DATA_TOKEN, useValue: {message, type} }]
      });

      const component = new ComponentPortal(ToasterComponent, null, portalInjector);

      this.overlayRef.attach(component);

      setTimeout(() => this.dismiss(), timeout)

      return { ref: this.overlayRef }
    }
    return null;
  }

  dismiss() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
