import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Topping } from './../../models/topping.model';
import { Pizza } from './../../models/pizza.model';

@Component({
  selector: 'app-pizza-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.scss']
})
export class PizzaFormComponent implements OnInit {
  exists = false;

  @Input() pizza: Pizza;
  @Input() toppings: Topping[];

  @Output() selected = new EventEmitter<string[]>();
  @Output() create = new EventEmitter<Pizza>();
  @Output() update = new EventEmitter<Pizza>();
  @Output() remove = new EventEmitter<Pizza>();

  form = this.fb.group({
    name: ['', Validators.required],
    toppingIds: [[]]
  });

  constructor(private fb: FormBuilder) {}

  get name() {
    return this.form.get('name') as FormControl;
  }

  ngOnInit() {
    if (this.pizza && this.pizza.id) {
      this.exists = true;
      this.form.patchValue(this.pizza);
    }
  }

  onSelectTopping(event: string[]) {
    this.selected.emit(event);
  }

  createPizza(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updatePizza(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.pizza, ...value });
    }
  }

  removePizza(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.pizza, ...value });
  }
}
