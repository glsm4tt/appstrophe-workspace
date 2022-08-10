import { CommonModule } from '@angular/common';
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
  selector: 'article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, SharedLibModule]
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
