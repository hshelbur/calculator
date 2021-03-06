import React from "react"
import ReactDOM from "react-dom"
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'

import './_styles.css'

const initialState = {
	currentValue: "0",
	operator: null,
	previousValue: 0,
}

function calculate(currentValue, previousValue, operator) {
	switch (operator) {
		case `+`:
			return previousValue + currentValue
		case `-`:
			return previousValue - currentValue
		case `*`:
			return previousValue * currentValue
		case `/`:
			return previousValue / currentValue
		default:
			return currentValue
	}
}

// actions

const CLEAR = `CLEAR`
const ENTER_NUMBER = `ENTER_NUMBER`
const EVALUATE = `EVALUATE`
const SET_OPERATOR = `SET_OPERATOR`

function clear() {
	return {type: CLEAR, data: {}}
}

function enterNumber(number) { 
	return {type: ENTER_NUMBER, data: {number}}
}

function evalute() {
	return {type: EVALUATE, data: {}}
}

function setOperator(operator) {
	return {type: SET_OPERATOR, data: {operator}}
}

// reducers

function calculator(state = initialState, action) {
	switch (action.type) {
		case CLEAR:
			return initialState
		case ENTER_NUMBER:
			return state.currentValue === "0" ? {...state, currentValue: action.data.number} : {...state, currentValue: state.currentValue + action.data.number}
		case SET_OPERATOR:
			return {currentValue: '0', operator: action.data.operator, previousValue: state.operator ? calculate(parseFloat(state.currentValue), state.previousValue, state.operator).toString() : parseFloat(state.currentValue)}
		case EVALUATE:
			return {...initialState, currentValue: calculate(parseFloat(state.currentValue), state.previousValue, state.operator).toString()}
		default:
			return state
	}
}

const store = createStore(calculator)

const App = ({currentValue, operator, previousValue, dispatch}) => 
	<main className="calculator">
		<h1 className="header">Howard Instruments 2019</h1>
		<h2 className="value">{currentValue}</h2>
		<section className="number">
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={1}>1</button>
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={2}>2</button>
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={3}>3</button>
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={4}>4</button>
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={5}>5</button>
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={6}>6</button>
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={7}>7</button>
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={8}>8</button>
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={9}>9</button>
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={0}>0</button>
			<button onClick={(e) => dispatch(enterNumber(e.target.value))} value={`.`}>.</button>
		</section>
		<section className="operator">
			<button onClick={(e) => dispatch(setOperator(e.target.value))} value={`+`}>+</button>
			<button onClick={(e) => dispatch(setOperator(e.target.value))} value={`-`}>-</button>
			<button onClick={(e) => dispatch(setOperator(e.target.value))} value={`*`}>*</button>
			<button onClick={(e) => dispatch(setOperator(e.target.value))} value={`/`}>/</button>
			<button onClick={(e) => dispatch(evalute())}>=</button>
			<button onClick={() => dispatch(clear())}>C</button>
		</section>
	</main>

function mapStateToProps(state) {
	return state
}

const ConnectedApp = connect(mapStateToProps)(App)

ReactDOM.render(<Provider store={store}><ConnectedApp /></Provider>, document.getElementById("root"));