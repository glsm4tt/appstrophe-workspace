import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { ArticleDetailed } from '@appstrophe-workspace/reading/domain';
import { faHandsClapping, faComment, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'article-footer',
  template: `
    <div class="card_footer">
      <div class="card_footer__start">
          <span class="card_footer__likes">
              <ng-container *ngIf="article">
                  <fa-icon [tooltip]="article?.likes?.length ? article?.likes?.length + ' Likes' : 'Be the first one liking it !'" class="clap__icon" [icon]="faHandsClapping">
                  </fa-icon>{{article?.likes?.length}}
              </ng-container>
          </span>
          <span class="card_footer__comments">
              <ng-container *ngIf="article">
                  <fa-icon [tooltip]="article?.comments?.length ? article?.comments?.length + ' comments' : 'Be the first one commenting it !'" class="comment__icon" [icon]="faComment">
                  </fa-icon>{{article?.comments?.length}}
              </ng-container>
          </span>
      </div>
      <div class="card_footer__end">
          <span class="card_footer__share">
              <fa-icon tooltip="Share" class="share__icon" [icon]="faArrowUpFromBracket"></fa-icon>
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
  imports: [NgIf, FontAwesomeModule, SharedLibModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleFooterComponent {

  @Input() article: Partial<ArticleDetailed>;

  faHandsClapping = faHandsClapping;
  faComment = faComment;
  faArrowUpFromBracket = faArrowUpFromBracket;
}
