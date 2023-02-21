
import { createReducer, on } from '@ngrx/store';
import { CalcState } from "./../states/counter.state"
import * as CalcActions from "../actions/calc.action"
import { state } from '@angular/animations';





const  initialState: CalcState = {
  display: '',
  current: '',
  prev: '',
  op: ''
}

export const CalcReducer = createReducer(
  initialState,
  on(CalcActions.addDigit, (state, {digit})=>{
    let temp;
    if(state.current.includes('.') && digit === '.')
    {
      temp = state.current
    }
    else {
      temp = state.current + digit
    }
    return {...state, current: temp, display: temp}
  }),

  on(CalcActions.addOperator, (state,{operator})=>{
    let temp = calculate(state.prev, state.op, state.current)
    return {...state, prev: temp, op: operator, current: '', display: temp}         //trả về giá trị
  }),


  on(CalcActions.calculate, (state)=>{
    let temp = calculate(state.prev, state.op, state.current)
    return {...state, prev: temp, op: '', current: '', display: temp}
  }),

  on(CalcActions.reset, (state)=>{
    return {...state, prev: '', op: '', current: '', display: ''}
  }),



)


function calculate(prev: string, op: string, current: string) {
  if(!prev)
    return current
  else if(!current)
    return prev

  let result: number = 0;
  switch (op) {
    case '+':
      result = parseFloat(prev) + parseFloat(current)
      break;
    case '-':
      result = parseFloat(prev) - parseFloat(current)
    break;
    case 'x':
      result = parseFloat(prev) * parseFloat(current)
    break;
    case ':':
      result = parseFloat(prev) / parseFloat(current)
    break;

    default:
      break;
  }
  let finalResult = result.toString().slice(0,12)
  if (finalResult=== 'NaN') {
      return 'error'
  }
  else if (finalResult=== 'Infinity') {
    return '∞'
}
  else{
    return finalResult
  }
}


// export const initialState = 0;

// export const counterReducer = createReducer(
//   initialState,
//   on(increment, (state) => state + 1),
//   on(decrement, (state) => state - 1),
//   on(reset, (state) => 0)
// );
