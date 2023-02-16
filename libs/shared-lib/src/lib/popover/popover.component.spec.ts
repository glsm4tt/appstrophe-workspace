import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DATA_TOKEN, PopoverContainerComponent } from './popover.component';

describe('PopoverContainerComponent', () => {
  let component: PopoverContainerComponent;
  let fixture: ComponentFixture<PopoverContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopoverContainerComponent],
      providers: [{ provide: DATA_TOKEN, useValue: null }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
