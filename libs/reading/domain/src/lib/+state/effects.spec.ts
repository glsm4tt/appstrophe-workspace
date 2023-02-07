import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ArticleService, CommentService } from '../services';
import { ArticleEffects } from './effects';
import { ArticleServiceStub } from '../testing/services/article.service.stub';
import { CommentServiceStub } from '../testing';

describe('ArticleEffects', () => {
  let actions$: Observable<any>;
  let effects: ArticleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleEffects,
        { provide: ArticleService, useValue: ArticleServiceStub },
        { provide: CommentService, useValue: CommentServiceStub },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ArticleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
