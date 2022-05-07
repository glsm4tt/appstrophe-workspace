import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';

@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, BlogRoutingModule, SharedLibModule],
})
export class BlogModule {}
