import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailUpdateConfirmationModalComponent } from './user-profile-email-update-confirmation-modal.component';

describe('EmailUpdateConfirmationModalComponent', () => {
  let component: EmailUpdateConfirmationModalComponent;
  let fixture: ComponentFixture<EmailUpdateConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmailUpdateConfirmationModalComponent
      ],
      providers: [
        Overlay
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailUpdateConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
