import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '@appstrophe-workspace/reading/domain';

@Component({
  selector: 'article-card',
  template: `
    <div class="card">
      <div class="card_avatar">
          <img class="card_avatar__img" [src]="article?.author?.photoUrl" alt="Photo de l'auteur de l'article" (click)="onClick(article)">
      </div>
      <div class="card_body" (click)="onClick(article)">
          <h2 class="card_title">{{article?.title}}</h2>
          <div class="card_content">
              <div class="card_content__img">
                  <img [src]="article?.imageUrl" alt="Image de l'article"/>
              </div>
              <p class="card_content__text text-fade">{{article?.description}}</p>
          </div>
      </div>
      <div class="card_footer" (click)="onClick(article)">
          <span  class="card_footer__badges-container"><span class="card_footer__badges" *ngFor="let tag of article?.tags">{{tag}}</span></span>
          <span class="card_footer__infos">{{article?.time}} min read</span>
      </div>
    </div>
  `,
  styles: [`
  div.card {
    @apply relative bg-white dark:bg-zinc-900 shadow-xl rounded-lg mt-16
  }

  div.card > div.card_avatar {
    @apply absolute w-full flex justify-center md:justify-end md:pr-4 -mt-16
  }

  div.card > div.card_avatar > img {
    @apply w-20 h-20 cursor-pointer object-cover rounded-full border-2 border-orange-500
  }

  div.card > div.card_body {
    @apply pt-4 px-8 cursor-pointer
  }

  div.card > div.card_body > h2.card_title {
    @apply text-gray-800 dark:text-gray-300 text-2xl font-semibold
  }

  div.card > div.card_body > div.card_content {
    @apply mt-2 text-gray-600 flex flex-row items-center
  }

  div.card > div.card_body > div.card_content div.card_content__img {
    @apply basis-1/3
  }

  div.card > div.card_body > div.card_content div.card_content__img img {
    @apply h-28 m-auto
  }

  div.card > div.card_body > div.card_content p.card_content__text {
    @apply basis-2/3 h-32
  }

  div.card > div.card_body > div.card_content > p.card_content__text.text-fade {
    @apply bg-clip-text text-transparent bg-gradient-to-b from-gray-600 
  }

  div.card div.card_footer {
    @apply flex py-4 px-8 justify-between items-center mt-1 cursor-pointer
  }

  div.card div.card_footer span.card_footer__badges-container {
    @apply flex items-center
  }

  div.card div.card_footer  span.card_footer__badges-container span.card_footer__badges {
    @apply mr-1 text-xs rounded-full bg-green-100 text-green-500 dark:bg-green-900 px-3 py-1
  }

  div.card div.card_footer span.card_footer__infos {
    @apply text-base justify-self-end font-medium text-orange-500
  }
  `],
  standalone: true,
  imports: [NgForOf],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent{
  @Input() article!: Partial<Article>;

  @Output() clicked = new EventEmitter<Partial<Article>>();

  onClick(article: Partial<Article>) {
    this.clicked.emit(article);
  }
}
