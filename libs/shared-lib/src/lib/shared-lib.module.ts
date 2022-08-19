import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStateDirective } from './directives/form-state/form-state.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { CopyCurrentUrlDirective } from './directives/copy-current-url/copy-current-url.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormStateDirective,
    TooltipDirective,
    CopyCurrentUrlDirective
  ],
  exports: [
    FormStateDirective,
    TooltipDirective, 
    CopyCurrentUrlDirective
  ],
})
export class SharedLibModule {}
