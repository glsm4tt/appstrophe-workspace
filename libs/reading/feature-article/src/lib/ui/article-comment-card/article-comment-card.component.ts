import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthorFullnamePipe, Comment } from '@appstrophe-workspace/reading/domain';
import { FirestoreTimestampPipe, SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'article-comment-card',
  standalone: true,
  imports: [FontAwesomeModule, NgIf, NgClass, SharedLibModule, FirestoreTimestampPipe, AuthorFullnamePipe],
  template: `
    <div class="card">
      <div class="card_author">
          <img [src]="comment?.author?.photoUrl" alt="Photo de l'auteur du commentaire">
          <div class="author__identity">
            <h3>{{ comment?.author | authorFullname }}</h3>
            <h4>{{ comment?.date | firestoreTimestamp }}</h4>
          </div>
      </div>
      <div class="card_body">
          <p>
              {{ comment?.text }}
          </p>
      </div>
      <div class="card_footer">
          <div class="card_footer__start">
              <span class="card_footer__likes">
                  <fa-icon [ngClass]="{'text-orange-400': comment?.liked}" (click)="likeChange.emit()" [tooltip]="comment?.reactions?.length ? comment?.reactions?.length + ' Reactiond' : 'Be the first one liking it !'" class="like__icon" [icon]="faThumbsUp">
                  </fa-icon>
                  <span *ngIf="comment?.reactions?.length">{{ comment?.reactions?.length }}</span>
              </span>
          </div>
      </div>
    </div>
  `,
  styles: [`
    div.card {
      @apply relative shadow-xl rounded-lg mt-16
    }

    div.card > div.card_author {
      @apply absolute w-full flex justify-start pl-4 -mt-16;
    }

    div.card > div.card_author > img {
      @apply w-20 h-20 object-cover rounded-full border-2 border-orange-500 text-center
    }

    div.card > div.card_author > div.author__identity {
      @apply flex flex-col items-start justify-evenly ml-4
    }

    div.card > div.card_body {
      @apply pt-6 pb-2 px-4
    }

    div.card > div.card_body > p {
      @apply break-all
    }

    div.card div.card_footer {
      @apply flex py-2 px-2 justify-between items-center
    }

    div.card div.card_footer__start {
      @apply flex justify-center items-center
    }

    div.card div.card_footer > div.card_footer__start > .card_footer__likes .like__icon {
      @apply mx-2 cursor-pointer transition-all ease-in-out duration-300 hover:scale-125;
    }

    div.card div.card_footer__end {
      @apply flex justify-center items-center
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentCardComponent {
  @Input() comment: Partial<Comment>;
  @Output() likeChange = new EventEmitter<void>();

  faThumbsUp = faThumbsUp;
}