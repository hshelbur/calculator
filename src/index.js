import React from "react"
import ReactDOM from "react-dom"
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'

const initialState = {
	currentValue: "0",
	operator: null,
	previousValue: 0,
}

// actions

const CLEAR = `CLEAR`
const ENTER_NUMBER = `ENTER_NUMBER`

function clear() {
	return {type: CLEAR, data: {}}
}

function enterNumber(number) { 
	return {type: ENTER_NUMBER, data: {number}}
}

// reducers

function calculator(state = initialState, action) {
	switch (action.type) {
		case CLEAR:
			return initialState
		case ENTER_NUMBER:
			return state.currentValue === "0" ? {...state, currentValue: action.data.number} : {...state, currentValue: state.currentValue + action.data.number}
		default:
			return state
	}
}

const store = createStore(calculator)

const App = ({currentValue, operator, previousValue}) => 
	<React.Fragment>
		<h1>Howard Instruments 2019</h1>
		<h2>{currentValue}</h2>
	</React.Fragment>

function mapStateToProps(state) {
	return state
}

const ConnectedApp = connect(mapStateToProps)(App)

ReactDOM.render(<Provider store={store}><ConnectedApp /></Provider>, document.getElementById("root"));