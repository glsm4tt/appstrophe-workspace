import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkdownModule } from 'ngx-markdown';

import { ArticleDetailsComponent } from './article-details.component';
import { AuthService } from '@appstrophe-workspace/auth-lib';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import * as fromArticle from '@appstrophe-workspace/reading/domain';

const ARTICLE_ID = '4';

describe('ArticleDetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;
  let store: Store;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleDetailsComponent,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        { provide: AuthService, useValue: {} },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                articleId: ARTICLE_ID
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsComponent);
    store = TestBed.inject(Store);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the load article action with the route parameter during the init', () => {
    const spy = jest.spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(fromArticle.loadArticle({ articleId: ARTICLE_ID }))
  });
});
