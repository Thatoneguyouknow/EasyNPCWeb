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
  AbstractControlDirective,
  FormBuilder,
  FormGroup,
  NgControl,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';

class DualNum {
  constructor(public beginning: number, public end: number) {}
}

@Component({
  selector: 'dual-number-input',
  templateUrl: './dualNumberInput.html',
  styleUrls: ['./dualNumberInput.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: DualNumberInput }],
})
export class DualNumberInput implements MatFormFieldControl<DualNum> {
  parts: FormGroup;
  stateChanges = new Subject<void>();
  static nextId = 0;
  @HostBinding() id = `dual-number-input-${DualNumberInput.nextId++}`;
  focused: boolean = false;
  touched: boolean = false;
  controlType: string = 'dual-number-input';
  onTouched = () => {};
  @Input('aria-describedby') userAriaDescribedBy?: string | undefined;

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.parts = formBuilder.group({
      beginning: '',
      end: '',
    });
  }

  @Input()
  get value(): DualNum | null {
    let val = this.parts.value;
    if (val.beginning >= 0 && val.end >= 0 && val.beginning <= val.end) {
      return new DualNum(val.beginning, val.end);
    }
    return null;
  }
  set value(num: DualNum | null) {
    num = num || new DualNum(0, 0);
    this.parts.setValue({ beginning: num.beginning, end: num.end });
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
  private _placeholder: string  = '';

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

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}
