import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppStropher, AuthService, AuthServiceStub } from '@appstrophe-workspace/auth/domain';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommentService, Mock } from '@appstrophe-workspace/reading/domain';
import { of } from 'rxjs';

import { ArticleCommentsAddComponent } from './article-comments-add.component';
import { Router } from '@angular/router';
import { IdTokenResult } from '@angular/fire/auth';

const user: AppStropher = {
  emailVerified: false,
  isAnonymous: false,
  metadata: undefined,
  providerData: [],
  refreshToken: '',
  tenantId: '',
  delete: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getIdToken: function (forceRefresh?: boolean): Promise<string> {
    throw new Error('Function not implemented.');
  },
  getIdTokenResult: function (forceRefresh?: boolean): Promise<IdTokenResult> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  toJSON: function (): object {
    throw new Error('Function not implemented.');
  },
  displayName: '',
  email: '',
  phoneNumber: '',
  photoURL: '',
  providerId: '',
  uid: ''
}

describe('ArticleCommentsAddComponent', () => {
  let component: ArticleCommentsAddComponent;
  let fixture: ComponentFixture<ArticleCommentsAddComponent>;

  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleCommentsAddComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: CommentService, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentsAddComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    // reset all spies
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to the login page if the user isn\'t logged on textarea enter', () => {
    const articleCommentsAddComponentElement: HTMLElement = fixture.nativeElement;
    const textareaElement: HTMLTextAreaElement = articleCommentsAddComponentElement.querySelector('#comment');
    const checkIfConnectedSpy = jest.spyOn(component, 'checkIfConnected');
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    const userSpy = jest.spyOn(authService, 'getConnectedUser').mockReturnValue(of(null));

    const event = new Event('focus');
    textareaElement.dispatchEvent(event);

    expect(checkIfConnectedSpy).toBeCalledTimes(1);
    expect(navigateSpy).toBeCalledTimes(1);
    expect(userSpy).toBeCalledTimes(1);
    expect(navigateSpy).toBeCalledWith(`/auth/login?previous=/`);
  });

  it('should not redirect to the login page if the user is logged on textarea enter', () => {
    const articleCommentsAddComponentElement: HTMLElement = fixture.nativeElement;
    const textareaElement: HTMLTextAreaElement = articleCommentsAddComponentElement.querySelector('#comment');
    const checkIfConnectedSpy = jest.spyOn(component, 'checkIfConnected');
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    const userSpy = jest.spyOn(authService, 'getConnectedUser').mockReturnValue(of(user));

    const event = new Event('focus');
    textareaElement.dispatchEvent(event);

    expect(checkIfConnectedSpy).toBeCalledTimes(1);
    expect(userSpy).toBeCalledTimes(1);
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
