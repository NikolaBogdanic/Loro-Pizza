import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Topping } from '../../models/topping.model';

const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToppingsComponent),
  multi: true
};

@Component({
  selector: 'app-toppings',
  providers: [PIZZA_TOPPINGS_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.scss']
})
export class ToppingsComponent implements ControlValueAccessor {
  value: string[] = [];

  @Input() toppings: Topping[] = [];
  @Output() selectedTopping = new EventEmitter<string[]>();

  private onTouch: Function;
  private onModelChange: Function;

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: string[]) {
    this.value = value;
  }

  selectTopping(toppingId: string) {
    if (this.existsInToppings(toppingId)) {
      this.value = this.value.filter(item => item !== toppingId);
    } else {
      this.value = [...this.value, toppingId];
    }
    this.onTouch();
    this.onModelChange(this.value);
    this.selectedTopping.emit(this.value);
  }

  existsInToppings(toppingId: string) {
    return this.value.includes(toppingId);
  }
}
