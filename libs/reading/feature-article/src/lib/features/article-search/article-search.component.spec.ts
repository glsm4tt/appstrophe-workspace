import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import * as fromArticle from '@appstrophe-workspace/reading/domain';

import { ArticleSearchComponent } from './article-search.component';
import { FilterArticlesFormState } from '@appstrophe-workspace/reading/domain';

describe('ArticleSearchComponent', () => {
  let component: ArticleSearchComponent;
  let fixture: ComponentFixture<ArticleSearchComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleSearchComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSearchComponent);
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

  it('should save the search value into the store on every time search input value change', () => {
    const value: FilterArticlesFormState = {
      search: 'test',
      tags: []
    };
    const articleSearchComponentElement: HTMLElement = fixture.nativeElement;
    const searchInputElement: HTMLInputElement = articleSearchComponentElement.querySelector('#search');
    const spy = jest.spyOn(store, 'dispatch');

    searchInputElement.value = value.search;

    searchInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable();

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(fromArticle.filterArticlesFormStateChange({ filterArticlesFormState: value }));    
  });

  it('should next an empty value to the d$ subject that stops subscriptions on component destruction', done => {
    const value: FilterArticlesFormState = {
      search: 'test',
      tags: []
    };
    
    const articleSearchComponentElement: HTMLElement = fixture.nativeElement;
    const searchInputElement: HTMLInputElement = articleSearchComponentElement.querySelector('#search');

    const spy = jest.spyOn(component.d$, 'next');
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');

    component.d$.subscribe({
      next: () => {
        expect(spy).toHaveBeenCalled();
        expect(storeDispatchSpy).not.toHaveBeenCalled();
        done();
      }
    })

    component.ngOnDestroy();

    searchInputElement.value = value.search;

    searchInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable();
  });
});
