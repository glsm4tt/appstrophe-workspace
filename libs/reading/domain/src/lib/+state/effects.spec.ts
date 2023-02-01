import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ArticleService } from '../services';

import { ArticleEffects } from './effects';

describe('ArticleEffects', () => {
  let actions$: Observable<any>;
  let effects: ArticleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleEffects,
        { provide: ArticleService, useValue: {
          getAll: () => of([]),
          getOne: () => of(null),
          getComments: () => of([]),
        }},
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ArticleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
