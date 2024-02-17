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
import { Observable, Subject } from 'rxjs';
import {
  StatTypes,
  availableAbilities,
  characterStat,
} from 'src/app/constants';

@Component({
  selector: 'stat-list-input',
  templateUrl: './statListInput.html',
  styleUrls: ['./statListInput.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: StatListInput }],
})
export class StatListInput
  implements MatFormFieldControl<Array<characterStat>>, ControlValueAccessor
{
  parts: FormGroup<{
    str: FormGroup<{
      stat: FormControl<StatTypes | null>;
      stat_val: FormControl<number | null>;
      stat_mod: FormControl<number | null>;
    }>;
    dex: FormGroup<{
      stat: FormControl<StatTypes | null>;
      stat_val: FormControl<number | null>;
      stat_mod: FormControl<number | null>;
    }>;
    con: FormGroup<{
      stat: FormControl<StatTypes | null>;
      stat_val: FormControl<number | null>;
      stat_mod: FormControl<number | null>;
    }>;
    int: FormGroup<{
      stat: FormControl<StatTypes | null>;
      stat_val: FormControl<number | null>;
      stat_mod: FormControl<number | null>;
    }>;
    wis: FormGroup<{
      stat: FormControl<StatTypes | null>;
      stat_val: FormControl<number | null>;
      stat_mod: FormControl<number | null>;
    }>;
    cha: FormGroup<{
      stat: FormControl<StatTypes | null>;
      stat_val: FormControl<number | null>;
      stat_mod: FormControl<number | null>;
    }>;
  }>;
  stateChanges = new Subject<void>();
  static nextId = 0;
  @HostBinding() id = `dual-number-input-${StatListInput.nextId++}`;
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
      str: formBuilder.group({
        stat: availableAbilities[0],
        stat_val: 0,
        stat_mod: 0,
      }),
      dex: formBuilder.group({
        stat: availableAbilities[1],
        stat_val: 0,
        stat_mod: 0,
      }),
      con: formBuilder.group({
        stat: availableAbilities[2],
        stat_val: 0,
        stat_mod: 0,
      }),
      int: formBuilder.group({
        stat: availableAbilities[3],
        stat_val: 0,
        stat_mod: 0,
      }),
      wis: formBuilder.group({
        stat: availableAbilities[4],
        stat_val: 0,
        stat_mod: 0,
      }),
      cha: formBuilder.group({
        stat: availableAbilities[5],
        stat_val: 0,
        stat_mod: 0,
      }),
    });
  }

  @Input()
  get value(): Array<characterStat> | null {
    let val = this.parts.value;
    console.log(val);
    if (
      val.str &&
      val.str.stat &&
      val.str.stat_val &&
      val.str.stat_mod &&
      val.dex &&
      val.dex.stat &&
      val.dex.stat_val &&
      val.dex.stat_mod &&
      val.con &&
      val.con.stat &&
      val.con.stat_val &&
      val.con.stat_mod &&
      val.int &&
      val.int.stat &&
      val.int.stat_val &&
      val.int.stat_mod &&
      val.wis &&
      val.wis.stat &&
      val.wis.stat_val &&
      val.wis.stat_mod &&
      val.cha &&
      val.cha.stat &&
      val.cha.stat_val &&
      val.cha.stat_mod
    ) {
      return [
        {
          stat: val.str.stat,
          statValue: val.str.stat_val,
          statModifier: val.str.stat_mod,
        },
        {
          stat: val.dex.stat,
          statValue: val.dex.stat_val,
          statModifier: val.dex.stat_mod,
        },
        {
          stat: val.con.stat,
          statValue: val.con.stat_val,
          statModifier: val.con.stat_mod,
        },
        {
          stat: val.int.stat,
          statValue: val.int.stat_val,
          statModifier: val.int.stat_mod,
        },
        {
          stat: val.wis.stat,
          statValue: val.wis.stat_val,
          statModifier: val.wis.stat_mod,
        },
        {
          stat: val.cha.stat,
          statValue: val.cha.stat_val,
          statModifier: val.cha.stat_mod,
        },
      ];
    }
    return null;
  }
  set value(val: Array<characterStat> | null) {
    val = val || [
      { stat: availableAbilities[0], statValue: 0, statModifier: 0 },
      { stat: availableAbilities[1], statValue: 0, statModifier: 0 },
      { stat: availableAbilities[2], statValue: 0, statModifier: 0 },
      { stat: availableAbilities[3], statValue: 0, statModifier: 0 },
      { stat: availableAbilities[4], statValue: 0, statModifier: 0 },
      { stat: availableAbilities[5], statValue: 0, statModifier: 0 },
    ];
    console.log(val);
    this.parts.setValue({
      str: {
        stat: val[0].stat,
        stat_val: val[0].statValue,
        stat_mod: val[0].statModifier,
      },
      dex: {
        stat: val[1].stat,
        stat_val: val[1].statValue,
        stat_mod: val[1].statModifier,
      },
      con: {
        stat: val[2].stat,
        stat_val: val[2].statValue,
        stat_mod: val[2].statModifier,
      },
      int: {
        stat: val[3].stat,
        stat_val: val[3].statValue,
        stat_mod: val[3].statModifier,
      },
      wis: {
        stat: val[4].stat,
        stat_val: val[4].statValue,
        stat_mod: val[4].statModifier,
      },
      cha: {
        stat: val[5].stat,
        stat_val: val[5].statValue,
        stat_mod: val[5].statModifier,
      },
    });
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
    return !val.str && !val.dex && !val.con && !val.int && !val.wis && !val.cha;
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
      '.stat-list-input-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input')?.focus();
    }
  }

  writeValue(val: Array<characterStat> | null) {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  _handleInput($event: Event): void {
    console.log($event);
    console.log(this.value);
    this.onChange(this.value);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}
