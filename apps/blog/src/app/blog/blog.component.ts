import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'blog-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
photoUrl!: string;
imgUrl!: string;

  constructor() {
    this.photoUrl = this.getAssetPrefix() + 'assets/img/W9aoBmrb_400x400.jpeg';
    this.imgUrl = this.getAssetPrefix() + 'assets/img/logo-search-grid-2x.png';
  }

  ngOnInit(): void {
    //empty
  }

  private getAssetPrefix(): string {
    return environment.hostUrl;
  }
}
