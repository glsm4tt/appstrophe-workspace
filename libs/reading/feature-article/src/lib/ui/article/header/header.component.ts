import { Component, Inject, OnInit } from '@angular/core';
import { faCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import {
  faYoutube,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'article-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule]
})
export class ArticleHeaderComponent implements OnInit {
  readonly faCircle = faCircle;
  readonly faYoutube = faYoutube;
  readonly faTwitter = faTwitter;
  readonly faLinkedin = faLinkedin;
  readonly faLink = faLink;
  photoUrl!: string;

  constructor() {
    this.photoUrl = 'assets/img/W9aoBmrb_400x400.jpeg';
  }

  ngOnInit() {
    // empty
  }
}
