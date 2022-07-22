import { Component, Inject, OnInit } from '@angular/core';
import { LIB_CONFIG, Config } from '../../../config/config';

@Component({
  selector: 'article-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  articleUrl: string;

  constructor(@Inject(LIB_CONFIG) private config: Config) {
    this.articleUrl = this.getAssetPrefix() + 'assets/article.md'
  }

  ngOnInit() {
    // empty
  }

  private getAssetPrefix(): string {
    return this.config.hostUrl;
  }
}
