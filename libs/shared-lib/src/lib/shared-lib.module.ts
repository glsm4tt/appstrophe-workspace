import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStateDirective } from './directives/form-state/form-state.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormStateDirective,
    TooltipDirective
  ],
  exports: [
    FormStateDirective,
    TooltipDirective
  ],
})
export class SharedLibModule {}
