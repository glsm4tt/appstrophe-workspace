import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[appsToasterHost]',
})
export class ToasterDirective {
  public viewContainerRef = inject(ViewContainerRef)
  
  constructor() {
    //empty
   }
}