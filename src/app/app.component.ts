


import { CalcState } from './states/counter.state';
import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CalcActions from '../app/actions/calc.action'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NGRX';
  count$!: Observable<number>

  calc$ = new Observable<CalcState>

  constructor(private store: Store<{calc: CalcState}>){
    this.calc$ = this.store.select('calc')
  }

  addDigit(digit: string){
    this.store.dispatch(CalcActions.addDigit({digit: digit}))
  }

  addOperator(operator: string){
    this.store.dispatch(CalcActions.addOperator({operator: operator}))
  }

  calculate(){
    this.store.dispatch(CalcActions.calculate())
  }

  reset(){
    this.store.dispatch(CalcActions.reset())
  }

}
