import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DATA_TOKEN } from '../popover';
import { ModalContainerComponent } from './modal.component';
import { ModalDirective } from './modal.directive';
describe('ModalContainerComponent', () => {
  let component: ModalContainerComponent<unknown>;
  let fixture: ComponentFixture<ModalContainerComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalContainerComponent],
      providers: [ModalDirective, { provide: DATA_TOKEN, useValue: null }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
