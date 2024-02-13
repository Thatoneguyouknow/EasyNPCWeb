import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, HostBinding, Inject, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { StatTypes } from 'src/app/constants';

@Component({
  selector: 'asi-input',
  templateUrl: './asiInput.html',
  styleUrls: ['./asiInput.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: AsiInput }],
})
export class AsiInput
  implements
    MatFormFieldControl<Array<[StatTypes, number]>>,
    ControlValueAccessor
{
  parts: FormGroup;
  stateChanges = new Subject<void>();
  static nextId = 0;
  @HostBinding() id = `asi-input-${AsiInput.nextId++}`;
  focused: boolean = false;
  touched: boolean = false;
  controlType: string = 'asi-input';
  onChange = (_: any) => {};
  onTouched = () => {};
  @Input('aria-describedby') userAriaDescribedBy?: string | undefined;

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
        this.ngControl.valueAccessor = this;
    }

    this.parts = formBuilder.group({
        
    })
  }
}
