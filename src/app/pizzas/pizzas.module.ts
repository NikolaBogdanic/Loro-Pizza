import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { SharedModule } from '../shared/shared.module';
import { PizzasRoutingModule } from './pizzas-routing.module';
import { PizzasComponent } from './containers/pizzas/pizzas.component';
import { PizzaComponent } from './containers/pizza/pizza.component';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';
import { PizzaDisplayComponent } from './components/pizza-display/pizza-display.component';
import { ToppingsComponent } from './components/toppings/toppings.component';
import { ConfirmRemoveDialogComponent } from './components/confirm-remove-dialog/confirm-remove-dialog.component';
import { PizzasState } from './store/pizzas.state';
import { ToppingsState } from './store/toppings.state';
import { PizzasService } from './services/pizzas.service';
import { ToppingsService } from './services/toppings.service';

@NgModule({
  imports: [
    SharedModule,
    PizzasRoutingModule,
    NgxsModule.forFeature([PizzasState, ToppingsState])
  ],
  declarations: [
    PizzasComponent,
    PizzaComponent,
    PizzaFormComponent,
    PizzaDisplayComponent,
    ToppingsComponent,
    ConfirmRemoveDialogComponent
  ],
  providers: [PizzasService, ToppingsService],
  entryComponents: [ConfirmRemoveDialogComponent]
})
export class PizzasModule {}
