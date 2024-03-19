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
    const invalid = begin > end;
    console.log(invalid);
    return invalid ? { invalidRange: { value: control.value } } : null;
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
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return control.value ? rangeValidator()(control) : null;
  }
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appForbiddenName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenValidatorDirective,
      multi: true,
    },
  ],
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName = '';

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.forbiddenName
      ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
      : null;
  }
}
