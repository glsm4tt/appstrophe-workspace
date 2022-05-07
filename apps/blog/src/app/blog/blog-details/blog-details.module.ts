import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogLibModule } from '@appstrophe-workspace/blog-lib';

import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { BlogDetailsComponent } from './blog-details.component';
import { environment } from 'apps/blog/src/environments/environment';

@NgModule({
  declarations: [BlogDetailsComponent],
  imports: [CommonModule, BlogDetailsRoutingModule, BlogLibModule.forRoot(environment)],
})
export class BlogDetailsModule {}
