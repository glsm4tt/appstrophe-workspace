import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { OutsideClickDirective } from './utils/directives/click-outside.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FontAwesomeModule],
  declarations: [HeaderComponent, OutsideClickDirective],
  exports: [HeaderComponent],
})
export class ShellFrameLibModule {}
