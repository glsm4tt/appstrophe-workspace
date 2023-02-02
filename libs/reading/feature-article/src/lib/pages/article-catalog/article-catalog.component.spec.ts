import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import * as fromArticle from '@appstrophe-workspace/reading/domain';

import { ArticleCatalogComponent } from './article-catalog.component';
import { first, of, zip } from 'rxjs';
import { Mock } from '@appstrophe-workspace/reading/domain';

describe('ArticleCatalogComponent', () => {
  let component: ArticleCatalogComponent;
  let fixture: ComponentFixture<ArticleCatalogComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleCatalogComponent,
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCatalogComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get articles and the isLoading information from the store during the init', done => {
    const selectSpy = jest.spyOn(store, 'select')
      .mockImplementation(select => select === fromArticle.selectFilteredArticles ? of(Mock.articleList) : of(false));

    component.ngOnInit();

    expect(selectSpy).toBeCalledTimes(2);

    zip(component.articles$, component.isLoading$)
      .pipe(first())
      .subscribe({
        next: ([articles, isLoading]) => {
          expect(articles).toEqual(Mock.articleList);
          expect(isLoading).toEqual(false);
          done();
        }
      })
  })

  it('should dispatch the loadArticle action during the init', () => { 
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toBeCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(fromArticle.loadArticles());
  })
});
