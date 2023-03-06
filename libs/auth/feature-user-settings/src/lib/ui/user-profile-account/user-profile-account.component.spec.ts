import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceStub } from '@appstrophe-workspace/auth/domain';

import { UserProfileAccountComponent } from './user-profile-account.component';

describe('UserProfileAccountComponent', () => {
  let component: UserProfileAccountComponent;
  let fixture: ComponentFixture<UserProfileAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserProfileAccountComponent,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
