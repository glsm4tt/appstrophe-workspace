import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, AuthServiceStub } from '@appstrophe-workspace/auth/domain';

import { AccountDeleteConfirmationModalComponent } from './user-profile-account-delete-confirmation-modal.component';

describe('AccountDeleteConfirmationModalComponent', () => {
  let component: AccountDeleteConfirmationModalComponent;
  let fixture: ComponentFixture<AccountDeleteConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountDeleteConfirmationModalComponent
      ],
      providers: [
        Overlay,
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDeleteConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
