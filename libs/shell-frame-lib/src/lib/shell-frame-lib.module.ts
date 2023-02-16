import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedLibModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class ShellFrameLibModule { }
