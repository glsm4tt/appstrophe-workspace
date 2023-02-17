import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CopyCurrentUrlDirective } from './copy-current-url.directive';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  template: `
    <div id="smart-div" appsCopyCurrentUrl>Something Smart</div>
  `
})
class TestComponent { }


describe('CopyCurrentUrlDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elems: DebugElement[];
  let clipboard: Clipboard;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CopyCurrentUrlDirective, TestComponent],
      providers: [Clipboard]
    })
      .createComponent(TestComponent);

    fixture.detectChanges();
    clipboard = TestBed.inject(Clipboard);

    elems = fixture.debugElement.queryAll(By.directive(CopyCurrentUrlDirective));
  });

  it('should create an instance', () => {
    const div: HTMLDivElement = document.createElement("div");
    const ref = new ElementRef(div);
    const directive = new CopyCurrentUrlDirective(clipboard, ref);
    expect(directive).toBeTruthy();
  });

  it('should copy the current url when the element is clicked on', done => {
    const div = elems[0].nativeElement;

    const event = new Event('click');
    div.dispatchEvent(event);


    const tooltipContainer: HTMLInputElement | null = document.querySelector('.tooltip-container');
    const tootlipText = tooltipContainer.textContent;
    expect(tooltipContainer).toBeDefined();

    expect(tootlipText).toEqual('Copied !');

    setTimeout(() => {
      const tooltipContainer: HTMLInputElement | null = document.querySelector('.tooltip-container');
      expect(tooltipContainer).toBeNull();
      done();
    }, 1000);

  });
});
