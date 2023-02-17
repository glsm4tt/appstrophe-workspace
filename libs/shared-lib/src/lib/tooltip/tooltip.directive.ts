import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appsTooltip]'
})
export class TooltipDirective implements OnDestroy {
  
  @Input() appsTooltip = ''; // The text for the tooltip to display
  @Input() delay? = 100; // Optional delay input, in ms

  private myPopup!: HTMLDivElement;
  private timer!: ReturnType<typeof setTimeout>;

  constructor(private el: ElementRef) { }

  ngOnDestroy(): void {
    if (this.myPopup) { this.myPopup.remove() }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.timer = setTimeout(() => {
      const x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2; // Get the middle of the element
      const y = this.el.nativeElement.getBoundingClientRect().top - this.el.nativeElement.offsetHeight - 24; // Get the top of the element, minus a little extra
      this.createTooltipPopup(x, y);
    }, this.delay)
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) { this.myPopup.remove() }
  }

  @HostListener('click') onClick() {
    if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) { this.myPopup.remove() }
  }

  private createTooltipPopup(x: number, y: number) {
    const popup = document.createElement('div');
    popup.innerHTML = this.appsTooltip;
    popup.setAttribute('data-cy', 'tooltip');
    popup.setAttribute('class', 'tooltip-container');
    popup.style.top = y.toString() + "px";
    popup.style.left = x.toString() + "px";
    document.body.appendChild(popup);
    this.myPopup = popup;
    setTimeout(() => {
      if (this.myPopup) this.myPopup.remove();
    }, 5000); // Remove tooltip after 5 seconds
  }

}