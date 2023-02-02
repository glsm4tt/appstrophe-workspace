import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comment } from '@appstrophe-workspace/reading/domain';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHandsClapping, faComment, faThumbsUp, faThumbsDown, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'article-comment-card',
  template: `
    <div class="card">
      <div class="card_avatar">
          <img [src]="comment?.author?.photoUrl" alt="Photo de l'auteur de l'article">
      </div>
      <div class="card_body">
          <p>
              {{comment?.text}}
          </p>
      </div>
      <div class="card_footer">
          <div class="card_footer__start">
              <span class="card_footer__likes">
                  <fa-icon [tooltip]="comment?.likes?.length ? comment?.likes?.length + ' Liked' : 'Be the first one liking it !'" class="clap__icon" [icon]="faThumbsUp">
                  </fa-icon>{{comment?.likes?.length}}
              </span>
              <span class="card_footer__dislikes">
                  <fa-icon tooltip="Disliked" class="dislikes__icon" [icon]="faThumbsDown">
                  </fa-icon>{{comment?.likes?.length}}
              </span>
              <span class="card_footer__champain">
                  <fa-icon tooltip="Loved it !" class="champain__icon" [icon]="faChampagneGlasses">
                  </fa-icon>{{comment?.likes?.length}}
              </span>
          </div>
      </div>
    </div>
  `,
  styles: [`
    div.card {
      @apply relative shadow-xl rounded-lg mt-16
    }

    div.card > div.card_avatar {
      @apply absolute w-full flex justify-start pl-4 -mt-16;
    }

    div.card > div.card_avatar > img {
      @apply w-20 h-20 object-cover rounded-full border-2 border-orange-500
    }

    div.card > div.card_body {
      @apply pt-6 pb-2 px-2
    }

    div.card > div.card_body > p {
      @apply whitespace-pre
    }

    div.card div.card_footer {
      @apply flex py-2 px-2 justify-between items-center
    }

    div.card div.card_footer__start {
      @apply flex justify-center items-center
    }

    div.card div.card_footer > div.card_footer__start > .card_footer__likes .clap__icon,
    div.card div.card_footer > div.card_footer__start > .card_footer__dislikes .dislikes__icon,
    div.card div.card_footer > div.card_footer__start > .card_footer__champain .champain__icon,
    div.card div.card_footer > div.card_footer__end > .card_footer__share .share__icon {
      @apply mx-2 cursor-pointer transition-all ease-in-out duration-300 hover:scale-125;
    }

    div.card div.card_footer__end {
      @apply flex justify-center items-center
    }
  `],
  standalone: true,
  imports: [FontAwesomeModule, SharedLibModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentCardComponent {
  @Input() comment!: Partial<Comment>;

  faHandsClapping = faHandsClapping;
  faComment = faComment;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faChampagneGlasses = faChampagneGlasses;
}
