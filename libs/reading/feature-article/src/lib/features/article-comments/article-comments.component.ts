import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@appstrophe-workspace/auth-lib';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { ArticleCommentsAddComponent } from './add/article-comments-add.component';
import { ArticleCommentsListComponent } from './list/article-comments-list.component';

@Component({
  selector: 'article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css'],
  standalone: true,
  imports: [CommonModule, ArticleCommentsListComponent, ArticleCommentsAddComponent]
})
export class ArticleCommentsComponent implements OnInit {
  readonly faPen = faPen;

  commentForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router) {
      this.commentForm = new FormGroup({
        comment: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(255)])
      })
  }

  ngOnInit(): void {
    // empty
  }

  submitComment(){
    // empty
  }

  checkIfConected(){
    this.authService.user$.pipe(
      first()
    ).subscribe(
      user => {
        if(!user){
          this.router.navigateByUrl(`/auth/login?previous=${this.router.url}`)
        }
      }
    )
  }
}
