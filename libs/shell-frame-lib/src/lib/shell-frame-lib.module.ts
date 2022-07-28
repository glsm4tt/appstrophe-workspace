import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { OutsideClickDirective } from './utils/directives/click-outside.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  declarations: [HeaderComponent, OutsideClickDirective],
  exports: [HeaderComponent, OutsideClickDirective],
})
export class ShellFrameLibModule { }
