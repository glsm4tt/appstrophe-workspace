import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: `
    <div id="smart-div" tooltip="Hi I'm in a tooltip">Something Smart</div>
  `
})
class TestComponent { }

describe('TooltipDirective', () => {
  const DEFAULT_DELAY_APPENED = 100;
  const DEFAULT_DELAY_DISAPEAR = 6000;

  let fixture: ComponentFixture<TestComponent>;
  let elems: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TooltipDirective, TestComponent]
    })
      .createComponent(TestComponent);

    fixture.detectChanges();

    elems = fixture.debugElement.queryAll(By.directive(TooltipDirective));
  });

  it('should create an instance', () => {
    const div: HTMLDivElement = document.createElement("div");
    const ref = new ElementRef(div);
    const directive = new TooltipDirective(ref);
    expect(directive).toBeTruthy();
  });

  it('should have only have 1 tooltiped element', () => {
    expect(elems.length).toEqual(1);
  });

  it('should create a inner div element when a mouseenter event is triggered', done => {
    const div = elems[0].nativeElement;

    const event = new Event('mouseenter');
    div.dispatchEvent(event);

    setTimeout(() => {
      const tooltipContainer: HTMLInputElement | null = document.querySelector('.tooltip-container');
      const tootlipText = tooltipContainer.textContent;
      expect(tooltipContainer).toBeDefined();
      expect(tootlipText).toEqual("Hi I'm in a tooltip");
      done();
    }, DEFAULT_DELAY_APPENED);
  });

  it('should remove the inner div element 5 seconds after the mouseenter event was triggered', done => {
    const h2 = elems[0].nativeElement;

    const event = new Event('mouseenter');
    h2.dispatchEvent(event);

    setTimeout(() => {
      const tooltipContainer: HTMLInputElement | null = document.querySelector('.tooltip-container');
      expect(tooltipContainer).toBeNull();
      done();
    }, DEFAULT_DELAY_DISAPEAR)
  }, 10000);
});
