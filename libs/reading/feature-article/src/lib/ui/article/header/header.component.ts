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
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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
