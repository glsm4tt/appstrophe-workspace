import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule } from 'ngx-markdown';

import { BlogHeaderComponent } from './article/header/header.component';
import { BodyComponent } from './article/body/body.component';
import { FooterComponent } from './article/footer/footer.component';
import { Config, LIB_CONFIG } from './config/config';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, HttpClientModule, MarkdownModule.forRoot({ loader: HttpClient })],
  declarations: [BlogHeaderComponent, BodyComponent, FooterComponent],
  exports: [BlogHeaderComponent, BodyComponent, FooterComponent],
})
export class BlogLibModule {
  static forRoot(config: Config){
    return {
      ngModule: BlogLibModule,
      providers: [
        { provide: LIB_CONFIG, useValue: config },
      ]
    }
  }
}
