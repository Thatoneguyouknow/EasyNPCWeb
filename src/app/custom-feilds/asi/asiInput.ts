import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { StatTypes, availableAbilities } from 'src/app/constants';

/*
I will need a list of ASI components.
This component will function as each individual ASI component, providing functionality to a dropdown selector of Stat Types, and a number input for the ASI val
Then I will create an ASI List component that will list these individual ASI components
Requirements:
  Cannot use stat type more than once
  Cannot have more than 6 ASIs in a list
  Cannot have negative value?
*/

@Component({
  selector: 'asi-input',
  templateUrl: './asiInput.html',
  styleUrls: ['./asiInput.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: AsiInput }],
})
export class AsiInput
  implements MatFormFieldControl<[StatTypes, number]>, ControlValueAccessor
{
  parts: FormGroup<{
    stat: FormControl<StatTypes | null>;
    val: FormControl<number | null>;
  }>;
  stateChanges = new Subject<void>();
  static nextId = 0;
  @HostBinding() id = `asi-input-${AsiInput.nextId++}`;
  focused: boolean = false;
  touched: boolean = false;
  controlType: string = 'asi-input';
  onChange = (_: any) => {};
  onTouched = () => {};
  @Input('aria-describedby') userAriaDescribedBy?: string | undefined;
  abilities = availableAbilities;

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
      stat: [availableAbilities[0], [Validators.required]],
      val: [0, [Validators.required]],
    });
  }

  @Input()
  get value(): [StatTypes, number] | null {
    let val = this.parts.value;
    if (val.stat && val.val && val.val > 0) {
      return [val.stat, val.val];
    }
    return null;
  }
  set value(val: [StatTypes, number] | null) {
    val = val || [availableAbilities[0], 0];
    this.parts.setValue({ stat: val[0], val: val[1] });
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(holder) {
    this._placeholder = holder;
    this.stateChanges.next();
  }
  private _placeholder: string = '';

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  get empty() {
    let val = this.parts.value;
    return !val.stat && !val.val;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(req: BooleanInput) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.asi-input-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent): void {
    if (
      (event.target as Element).tagName.toLowerCase() != 'select' &&
      (event.target as Element).tagName.toLowerCase() != 'input'
    ) {
      this._elementRef.nativeElement.querySelector('input')?.focus();
    }
  }

  writeValue(asi: [StatTypes, number] | null) {
    this.value = asi;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  _handleInput(): void {
    this.onChange(this.value);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}
