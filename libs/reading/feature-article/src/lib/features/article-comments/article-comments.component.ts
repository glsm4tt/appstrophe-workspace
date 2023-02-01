import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@appstrophe-workspace/auth-lib';
import { Router } from '@angular/router';
import { ArticleCommentsAddComponent } from './add/article-comments-add.component';
import { ArticleCommentsListComponent } from './list/article-comments-list.component';
import { Observable, EMPTY } from 'rxjs';
import * as fromArticle from '@appstrophe-workspace/reading/domain';
import { Store } from '@ngrx/store';

@Component({
  selector: 'article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css'],
  standalone: true,
  imports: [CommonModule, ArticleCommentsListComponent, ArticleCommentsAddComponent]
})
export class ArticleCommentsComponent implements OnInit {

  comments$: Observable<fromArticle.Comment[]> = EMPTY;

  private _store = inject(Store<fromArticle.ArticleRootState>);
  
  readonly faPen = faPen;

  ngOnInit(): void {
    this.comments$ = this._store.select(fromArticle.selectComments);
  }
}
