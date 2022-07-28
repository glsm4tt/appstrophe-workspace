import { Directive, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[formState]'
})
export class FormStateDirective {
  @Input() formGroup!: FormGroup;
  @Input()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set formState(val: any) {
      if(!val) return;
      this.formGroup.patchValue(val, {emitEvent: false})
    }

  constructor() { 
    // empty
  }

}
