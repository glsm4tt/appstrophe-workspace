import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  ElementRef,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appsOutsideClick]',
})
export class OutsideClickDirective {
  @Output()
  outsideClick: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(private _elementRef: ElementRef){
    // empty
  }

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      event.stopPropagation(); 
      this.outsideClick.emit(event);
    }
  }
}