import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceStub } from '@appstrophe-workspace/auth/domain';

import { UserProfilePictureComponent } from './user-profile-picture.component';

describe('UserProfilePictureComponent', () => {
  let component: UserProfilePictureComponent;
  let fixture: ComponentFixture<UserProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserProfilePictureComponent,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
