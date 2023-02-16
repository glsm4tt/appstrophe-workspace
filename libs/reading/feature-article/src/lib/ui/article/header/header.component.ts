import { Component, OnInit } from '@angular/core';
import { faCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import {
  faYoutube,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'article-header',
  template: `
    <div class="article_header" data-cy="article-header">
      <img class="article_header__avatar" [src]="photoUrl" data-cy="author-avatar">
      <div class="article_header__infos">
          <div class="article_header__infos_top">
              <h2 data-cy="author-fullname">Sylvain Dedieu</h2>
              <div class="social_media" *ngIf="url$ | async as url">
                  <a [href]="'https://twitter.com/intent/tweet?url=' + url" tooltip="Share on Twitter"
                      data-cy="share-on-twitter" class="social_media__icon" target="_blank" title="Share on Twitter">
                      <fa-icon [icon]="faTwitter"></fa-icon>
                  </a>
                  <a [href]="'https://www.linkedin.com/shareArticle?mini=true?url=' + url" tooltip="Share on LinkedIn"
                      data-cy="share-on-linkedIn" class="social_media__icon linkedin" target="_blank"
                      title="Share on LinkedIn">
                      <fa-icon [icon]="faLinkedin"></fa-icon>
                  </a>
                  <fa-icon copyCurrentUrl tooltip="Copy link" data-cy="copy-link" class="social_media__icon copy-link"
                      [icon]="faLink">
                  </fa-icon>
              </div>
          </div>
          <div class="article_header__infos_bottom">
              <span data-cy="publication-date">Apr 19</span>
              <fa-icon class="separator" [icon]="faCircle"></fa-icon>
              <span data-cy="time-of-read">5 min read</span>
              <fa-icon class="separator" [icon]="faCircle"></fa-icon>
              <fa-icon class="youtube" data-cy="watch-on-youtube" tooltip="Watch the Youtube video" [icon]="faYoutube">
              </fa-icon>
          </div>
      </div>
    </div>
  `,
  styles: [`
    div.article_header {
      @apply flex flex-row items-stretch
    }

    div.article_header img.article_header__avatar {
      @apply w-20 h-20 object-cover rounded-full border-2 border-orange-500
    } 

    div.article_header div.article_header__infos {
      @apply flex-grow flex flex-col justify-around items-stretch pl-6
    }

    div.article_header div.article_header__infos div.article_header__infos_top {
      @apply flex flex-row items-center justify-between
    }

    div.article_header div.article_header__infos div.article_header__infos_top h2 {
      @apply text-lg font-normal
    }

    div.article_header div.article_header__infos div.article_header__infos_top div.social_media {
      @apply flex flex-row items-center text-zinc-500 text-xl
    }

    div.article_header div.article_header__infos div.article_header__infos_top div.social_media .social_media__icon {
      @apply cursor-pointer transition-all ease-in-out duration-300 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 hover:dark:text-zinc-200 hover:scale-125
    }

    div.article_header div.article_header__infos div.article_header__infos_top div.social_media .social_media__icon.linkedin {
      @apply ml-2 md:ml-4 
    }

    div.article_header div.article_header__infos div.article_header__infos_top div.social_media .social_media__icon.copy-link {
      @apply ml-4 md:ml-16
    }

    div.article_header div.article_header__infos div.article_header__infos_bottom {
      @apply text-base text-zinc-500 font-normal flex flex-row items-center space-x-2 md:space-x-4
    }

    div.article_header div.article_header__infos div.article_header__infos_bottom .separator {
      @apply text-xs
    }

    div.article_header div.article_header__infos div.article_header__infos_bottom .youtube {
      @apply text-red-500 cursor-pointer transition-all ease-in-out duration-300 hover:scale-125
    }
  `],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, SharedLibModule]
})
export class ArticleHeaderComponent implements OnInit {
  readonly faCircle = faCircle;
  readonly faYoutube = faYoutube;
  readonly faTwitter = faTwitter;
  readonly faLinkedin = faLinkedin;
  readonly faLink = faLink;
  photoUrl!: string;
  
  url$: Observable<string> = EMPTY;

  constructor(private router: Router) {
    this.photoUrl = 'assets/img/W9aoBmrb_400x400.jpeg';
  }

  ngOnInit() {
    this.url$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).urlAfterRedirects),
      startWith(window.location.href),
      shareReplay(1)
    )
  }
}
