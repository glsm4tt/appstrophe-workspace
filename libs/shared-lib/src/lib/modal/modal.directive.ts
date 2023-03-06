import { Directive, ViewContainerRef, inject, ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[appsModalHost]',
})
export class ModalDirective {
  public viewContainerRef = inject(ViewContainerRef)
  public changeDetectorRef = inject(ChangeDetectorRef)
  
  constructor() {
    //empty
   }
}