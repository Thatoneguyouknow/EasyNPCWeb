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

@Component({
  selector: 'dual-number-input',
  templateUrl: './dualNumberInput.html',
  styleUrls: ['./dualNumberInput.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: DualNumberInput }],
})
export class DualNumberInput
  implements MatFormFieldControl<Array<number>>, ControlValueAccessor
{
  parts: FormGroup<{
    beginning: FormControl<number | null>;
    end: FormControl<number | null>;
  }>;
  stateChanges = new Subject<void>();
  static nextId = 0;
  @HostBinding() id = `dual-number-input-${DualNumberInput.nextId++}`;
  focused: boolean = false;
  touched: boolean = false;
  controlType: string = 'dual-number-input';
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
      beginning: [0, [Validators.required, Validators.min(0)]],
      end: [0, [Validators.required]],
    });
  }

  @Input()
  get value(): Array<number> | null {
    let val = this.parts.value;
    if (val.beginning && val.end && val.beginning >= 0 && val.end >= 0 && val.beginning <= val.end) {
      return [val.beginning, val.end];
    }
    return null;
  }
  set value(num: Array<number> | null) {
    num = num || [0, 0];
    this.parts.setValue({ beginning: num[0], end: num[1] });
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
    return !val.beginning && !val.end;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
    /*
    span {
  opacity: 0;
  transition: opacity 200ms;
}
:host.floating span {
  opacity: 1;
}*/
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
      '.dual-number-input-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input')?.focus();
    }
  }

  writeValue(dualVal: Array<number> | null) {
    this.value = dualVal;
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
