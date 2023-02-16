import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  ElementRef,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appstropheWorkspaceOutsideClick]',
})
export class OutsideClickDirective {
  @Output()
  outsideClick: EventEmitter<MouseEvent> = new EventEmitter();

  private _elementRef: ElementRef = inject(ElementRef);

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      event.stopPropagation(); 
      this.outsideClick.emit(event);
    }
  }
}