import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@appstrophe-workspace/auth-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleServiceMock } from '@appstrophe-workspace/reading/domain';
import { of } from 'rxjs';

import { ArticleCommentsAddComponent } from './article-comments-add.component';
import { Router } from '@angular/router';

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
        { provide: AuthService, useValue: ArticleServiceMock }
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check is the user is connected on textarea enter', () => {
    const articleCommentsAddComponentElement: HTMLElement = fixture.nativeElement;
    const textareaElement: HTMLTextAreaElement = articleCommentsAddComponentElement.querySelector('#comment');
    const checkIfConnectedSpy = jest.spyOn(component, 'checkIfConnected');
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    authService.user$ = of(null);

    const event = new Event('focus');
    textareaElement.dispatchEvent(event);

    expect(checkIfConnectedSpy).toBeCalledTimes(1);
    expect(navigateSpy).toBeCalledTimes(1);
    expect(navigateSpy).toBeCalledWith(`/auth/login?previous=/`);
  });
});
