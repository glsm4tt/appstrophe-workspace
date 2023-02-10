import { Directive, ElementRef, HostListener } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Directive({
  selector: '[copyCurrentUrl]'
})
export class CopyCurrentUrlDirective {

  private myPopup!: HTMLDivElement;

  constructor(private clipboard: Clipboard, private el: ElementRef) { }

  @HostListener('click') onClick() {
    this.clipboard.copy(window.location.href);
    const x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2; // Get the middle of the element
    const y = this.el.nativeElement.getBoundingClientRect().top - this.el.nativeElement.offsetHeight - 24; // Get the bottom of the element, plus a little extra
    this.createConfirmationPopup(x, y);
  }

  private createConfirmationPopup(x: number, y: number) {
    const popup = document.createElement('div');
    popup.innerHTML = 'Copied !';
    popup.setAttribute('data-cy', 'copied-tooltip');
    popup.setAttribute('class', 'tooltip-container');
    popup.style.top = y.toString() + "px";
    popup.style.left = x.toString() + "px";
    document.body.appendChild(popup);
    this.myPopup = popup;
    setTimeout(() => {
      if (this.myPopup) this.myPopup.remove();
    }, 1000); // Remove tooltip after 1 second 
  }

}
