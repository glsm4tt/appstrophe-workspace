import { Directive, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appsFormState]'
})
export class FormStateDirective {
  @Input() formGroup!: FormGroup;
  @Input()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set appsFormState(val: any) {
      if(!val) return;
      this.formGroup.patchValue(val, {emitEvent: false})
    }

  constructor() { 
    // empty
  }

}
