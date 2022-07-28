import { ElementRef } from '@angular/core';
import { OutsideClickDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef({});
    const directive = new OutsideClickDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
