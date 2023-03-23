import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Comment } from '@appstrophe-workspace/reading/domain';
import { FirestoreTimestampPipe, SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp, faEllipsisV, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, interval, map, Observable, scan, startWith, switchMap, take, tap, timer } from 'rxjs';

type CommentDisplay = Omit<Comment, 'date'> & { date: Observable<Timestamp> }; 

@Component({
  selector: 'apps-read-article-comment-card',
  standalone: true,
  imports: [FontAwesomeModule, NgIf, NgClass, SharedLibModule, FirestoreTimestampPipe, AsyncPipe],
  template: `
    <div class="card" data-cy="article-comment-card">
      <div class="card_author">
        <img [src]="internalComment?.author?.photoUrl" alt="Photo de l'auteur du commentaire">
        <div class="author__identity">
          <h3>{{ internalComment?.author?.alias }}</h3>
          <h4>{{ internalComment?.date | async | firestoreTimestamp }}</h4>
        </div>
        <div *ngIf="internalComment?.owned" class="comment-settings">
          <fa-icon [icon]="faEllipsisV" appsTooltip="Settings" appsPopover [popoverContent]="comment_popover"></fa-icon>
        </div>
      </div>
      <div class="card_body">
          <p>
            {{ internalComment?.text }}
          </p>
      </div>
      <div class="card_footer">
          <div class="card_footer__start">
              <span class="card_footer__likes">
                  <fa-icon [ngClass]="{'text-orange-400': internalComment?.liked}" (click)="likeChange.emit()" [appsTooltip]="internalComment?.reactions?.length ? internalComment?.reactions?.length + ' Reactiond' : 'Be the first one liking it !'" class="like__icon" [icon]="faThumbsUp">
                  </fa-icon>
                  <span *ngIf="internalComment?.reactions?.length">{{ internalComment?.reactions?.length }}</span>
              </span>
          </div>
      </div>
    </div>

    <ng-template #comment_popover>
      <ul class="comment-popover">
        <li>
          <a role="button" (click)="deleteRequest.emit()">
            <fa-icon [icon]="faTrash"></fa-icon>
            Delete
          </a>
        </li>
      </ul>
    </ng-template>
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

    div.card > div.card_author > div.comment-settings {
      @apply ml-auto py-2;
    }

    div.card > div.card_author > div.comment-settings > fa-icon {
      @apply px-4 cursor-pointer transition-all ease-in-out duration-300 hover:scale-125;
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

    ul.comment-popover > li > a {
      @apply flex items-center justify-center px-4 py-3 cursor-pointer hover:bg-zinc-400 dark:hover:bg-zinc-600
    }

    ul.comment-popover > li > a > fa-icon {
      @apply mr-4
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentCardComponent{

  private interval$ = new BehaviorSubject<number[]>([1, 1]);

  internalComment!: Partial<CommentDisplay>;
  @Input() 
  set comment(value: Partial<Comment>) {
      this.internalComment = {
        ...value,
        date: this.interval$.pipe(
          switchMap(i => {
            const currentFibonacciValue = i.at(-1)
            return currentFibonacciValue === 1 ? timer(0, 1000 * 60 * currentFibonacciValue) : interval(1000 * 60 * currentFibonacciValue)
          }),
          map(i => value.date),
          tap(_ => this.interval$.next(this.calculateNextFibonacciArray(this.interval$.value)))
        )
      }
  }

  @Output() likeChange = new EventEmitter<void>();
  @Output() deleteRequest = new EventEmitter<void>();

  readonly faThumbsUp = faThumbsUp;
  readonly faEllipsisV = faEllipsisV;
  readonly faPen = faPen;
  readonly faTrash = faTrash;

  private calculateNextFibonacciArray (fibonacciArray: number[]) {
    const fibonacciArrayLength = fibonacciArray.length;
    return [
      ...fibonacciArray,
      fibonacciArray[fibonacciArrayLength - 1] + fibonacciArray[fibonacciArrayLength - 2]
    ];
  }
}
