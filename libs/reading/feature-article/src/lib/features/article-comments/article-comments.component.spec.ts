import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthServiceStub } from '@appstrophe-workspace/auth/domain';
import { Mock } from '@appstrophe-workspace/reading/domain';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { ArticleCommentsComponent } from './article-comments.component';

describe('ArticleCommentsComponent', () => {
  let component: ArticleCommentsComponent;
  let fixture: ComponentFixture<ArticleCommentsComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleCommentsComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentsComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // reset all spies
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get comments on init', done => {
    const spy = jest.spyOn(store, 'select').mockImplementation((mapFn: (state: unknown) => unknown) => {
      switch (mapFn) {
        case fromArticle.selectArticle:
          return of(Mock.article);
        case fromArticle.selectComments:
          return of([Mock.comment]);
        default:
          return of(null)
      }
    });

    component.ngOnInit();

    component.articleWithComments$.pipe(first()).subscribe({
      next: article => {
        expect(spy).toHaveBeenNthCalledWith(1, fromArticle.selectArticle)
        expect(spy).toHaveBeenNthCalledWith(2, fromArticle.selectComments);
        expect(article.comments).toEqual([Mock.comment]);
        done();
      }
    })
  });
});
