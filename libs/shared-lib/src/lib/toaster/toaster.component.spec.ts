import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DATA_TOKEN } from '../popover';
import { ToasterComponent } from './toaster.component';
import { ToasterDirective } from './toaster.directive';
describe('ToasterComponent', () => {
  let component: ToasterComponent;
  let fixture: ComponentFixture<ToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToasterComponent],
      providers: [ToasterDirective, { provide: DATA_TOKEN, useValue: null }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
