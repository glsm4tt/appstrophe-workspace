import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[appsModalHost]',
})
export class ModalDirective {
  public viewContainerRef = inject(ViewContainerRef)
  
  constructor() {
    //empty
   }
}