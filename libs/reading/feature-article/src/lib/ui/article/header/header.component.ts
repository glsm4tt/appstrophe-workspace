import { Component, Inject, OnInit } from '@angular/core';
import { faCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import {
  faYoutube,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { Config, LIB_CONFIG } from '../../../config/config';

@Component({
  selector: 'article-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class BlogHeaderComponent implements OnInit {
  readonly faCircle = faCircle;
  readonly faYoutube = faYoutube;
  readonly faTwitter = faTwitter;
  readonly faLinkedin = faLinkedin;
  readonly faLink = faLink;
  photoUrl!: string;

  constructor(@Inject(LIB_CONFIG) private config: Config) {
    this.photoUrl = this.getAssetPrefix() + 'assets/img/W9aoBmrb_400x400.jpeg';
  }

  ngOnInit() {
    // empty
  }

  private getAssetPrefix(): string {
    return this.config.hostUrl;
  }
}
