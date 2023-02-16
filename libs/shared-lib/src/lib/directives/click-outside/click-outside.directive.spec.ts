import { ElementRef } from '@angular/core';
import { OutsideClickDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    const div: HTMLDivElement = document.createElement("div");
    const ref = new ElementRef(div);
    const directive = new OutsideClickDirective(ref);
    expect(directive).toBeTruthy();
  });
});
