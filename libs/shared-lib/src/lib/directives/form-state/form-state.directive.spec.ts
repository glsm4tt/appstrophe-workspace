import { FormGroup } from '@angular/forms';
import { FormStateDirective } from './form-state.directive';

describe('FormStateDirective', () => {
  afterEach(() => {
    // reset all spies
    jest.restoreAllMocks();
  });

  it('should create an instance', () => {
    const directive = new FormStateDirective();
    expect(directive).toBeTruthy();
  });

  it('should trigger the formGroup.patchValue function when a new formState input is pushed', () => {
    const directive = new FormStateDirective();
    directive.formGroup = new FormGroup({});
    const spy = jest.spyOn(directive.formGroup, 'patchValue');
    
    directive.appsFormState = { value: 'test' };
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith({ value: 'test' }, {emitEvent: false})
  });
});
