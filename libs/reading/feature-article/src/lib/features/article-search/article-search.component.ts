import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, EMPTY, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { FilterArticlesFormState } from '@appstrophe-workspace/reading/domain';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';

@Component({
  selector: 'apps-read-article-search',
  template: `
  <form class="search-section" [appsFormState]="formState$ | async" [formGroup]="searchForm">
    <div class="search-fields">
      <div class="form-group">
          <div class="form-group-content">
          <fa-icon
          class="form-group__icon start"
          [icon]="faSearch"></fa-icon>
        <input data-cy="input-search" type="text" class="form-group__control" formControlName="search" id="search"
              placeholder="Filter by name">
          </div>
      </div>
    </div>
  </form>
  `,
  styles: [`
    div.form-group .form-group__icon {
      @apply text-orange-500
    }
        
    form.search-section {
      @apply p-4 flex items-center justify-center
    }

    form.search-section > div.search-fields {
      @apply w-full md:w-1/2 
    }

    div.card-list {
      @apply grid grid-cols-1 gap-2 md:gap-8 md:grid-cols-2 m-1 
    }

    div.card-list .card {
      @apply transition-all ease-in-out duration-300 hover:scale-105 hover:px-0;
    }
  `],
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, FontAwesomeModule, SharedLibModule]
})
export class ArticleSearchComponent implements OnInit, OnDestroy {
  readonly faSearch = faSearch;

  d$ = new Subject<void>();

  formState$: Observable<FilterArticlesFormState> = EMPTY;

  searchForm: FormGroup;

  constructor(
    private store: Store<fromArticle.ArticleRootState>) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      tags: new FormArray([])
    })
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(takeUntil(this.d$)).subscribe({
      next: filterArticlesFormState => this.store.dispatch(fromArticle.filterArticlesFormStateChange({
        filterArticlesFormState
      })),
    });
  }

  ngOnDestroy(): void {
    this.d$.next();
    this.d$.complete();
  }
}
