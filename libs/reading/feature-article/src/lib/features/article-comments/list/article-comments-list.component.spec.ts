import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@appstrophe-workspace/auth-lib';
import { Mock } from '@appstrophe-workspace/reading/domain';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { first, of } from 'rxjs';
import * as fromArticle from '@appstrophe-workspace/reading/domain';

import { ArticleCommentsListComponent } from './article-comments-list.component';

describe('ArticleCommentsListComponent', () => {
  let component: ArticleCommentsListComponent;
  let fixture: ComponentFixture<ArticleCommentsListComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleCommentsListComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        {provide: AuthService, useValue: {}}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentsListComponent);
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
    const spy = jest.spyOn(store, 'select').mockReturnValue(of([Mock.comment]));

    component.ngOnInit();

    component.comments$.pipe(first()).subscribe({
      next: comments => { 
        expect(spy).toBeCalledWith(fromArticle.selectComments);
        expect(spy).toBeCalledTimes(1);
        expect(comments).toEqual([Mock.comment]);
        done();
      }
    })
  });
});
