import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkdownModule } from 'ngx-markdown';

import { ArticleDetailsComponent } from './article-details.component';
import { AuthService, AuthServiceStub } from '@appstrophe-workspace/auth/domain';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, ArticleServiceStub } from '@appstrophe-workspace/reading/domain';

const ARTICLE_ID = '4';

describe('ArticleDetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;
  let store: Store;

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
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: ArticleService, useValue: ArticleServiceStub },
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
