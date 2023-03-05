import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DATA_TOKEN } from '../popover';
import { ToasterComponent } from './toaster.component';
import { ToasterDirective } from './toaster.directive';

const DATA_TOKEN_MOCK = {
  message: 'test',
  type: 'default'
}

describe('ToasterComponent', () => {
  let component: ToasterComponent;
  let fixture: ComponentFixture<ToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ToasterComponent],
      providers: [ToasterDirective, { provide: DATA_TOKEN, useValue: DATA_TOKEN_MOCK }]
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
