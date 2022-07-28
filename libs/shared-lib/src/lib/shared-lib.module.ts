import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStateDirective } from './directives/form-state/form-state.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormStateDirective
  ],
  exports: [
    FormStateDirective
  ],
})
export class SharedLibModule {}
