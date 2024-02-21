import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function rangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const begin = control.value[0];
    const end = control.value[1];
    console.log(control.value);
    return begin > end ? { validRange: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appInvalidRange]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InvalidRangeDirective,
      multi: true,
    },
  ],
})
export class InvalidRangeDirective implements Validator {
  @Input('appInvalidRange') validRange = '';

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validRange ? rangeValidator()(control) : null;
  }
}
