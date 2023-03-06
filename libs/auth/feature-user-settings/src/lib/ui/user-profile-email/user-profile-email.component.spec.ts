import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceStub } from '@appstrophe-workspace/auth/domain';

import { UserProfileEmailComponent } from './user-profile-email.component';

describe('UserProfileEmailComponent', () => {
  let component: UserProfileEmailComponent;
  let fixture: ComponentFixture<UserProfileEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserProfileEmailComponent,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
