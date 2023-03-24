import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { ArticleDetailed } from '@appstrophe-workspace/reading/domain';
import { faHandsClapping, faComment, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'apps-read-article-footer',
  template: `
    <div class="card_footer">
      <div class="card_footer__start">
          <span class="card_footer__likes">
              <ng-container *ngIf="article">
                  <fa-icon [appsTooltip]="article?.likesCount ? article?.likesCount + ' Reactions' : 'Be the first one to like it !'" class="clap__icon"
                  [ngClass]="{'text-orange-400': article?.liked}" 
                  (click)="likeChange.emit()"
                  [icon]="faHandsClapping">
                  </fa-icon>
                  <span *ngIf="article?.likesCount">{{article?.likesCount}}</span>
              </ng-container>
          </span>
          <span class="card_footer__comments">
              <ng-container *ngIf="article">
                  <fa-icon [appsTooltip]="article?.comments ? article?.comments + ' comments' : 'Be the first one to comment !'" class="comment__icon" [icon]="faComment">
                  </fa-icon>
                  <span data-cy="article-comments" *ngIf="article?.comments">{{article?.comments}}</span>
              </ng-container>
          </span>
      </div>
      <div class="card_footer__end">
          <span class="card_footer__share">
              <fa-icon appsTooltip="Share" class="share__icon" [icon]="faArrowUpFromBracket"></fa-icon>
          </span>
      </div>
    </div>
  `,
  styles: [`
    div.card_footer {
      @apply flex py-2 px-2 justify-between items-center;
    }

    div.card_footer__start {
      @apply flex justify-center items-center
    }

    div.card_footer > div.card_footer__start > .card_footer__likes .clap__icon,
    div.card_footer > div.card_footer__start > .card_footer__comments .comment__icon,
    div.card_footer > div.card_footer__end > .card_footer__share .share__icon {
      @apply mx-2 cursor-pointer transition-all ease-in-out duration-300 hover:scale-125;
    }

    div.card_footer__end {
      @apply flex justify-center items-center
    }
  `],
  standalone: true,
  imports: [NgIf, NgClass, FontAwesomeModule, SharedLibModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleFooterComponent {

  @Input() article!: Partial<ArticleDetailed>;
  @Output() likeChange = new EventEmitter<void>();

  faHandsClapping = faHandsClapping;
  faComment = faComment;
  faArrowUpFromBracket = faArrowUpFromBracket;
}
