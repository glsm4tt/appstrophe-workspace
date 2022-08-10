import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { AuthService } from '@appstrophe-workspace/auth-lib';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'article-comments-add',
  templateUrl: './article-comments-add.component.html',
  styleUrls: ['./article-comments-add.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, SharedLibModule]
})
export class ArticleCommentsAddComponent implements OnInit {
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

  checkIfConnected(){
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
