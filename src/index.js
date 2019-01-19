import React from "react"
import ReactDOM from "react-dom"
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'

const initialState = {
	currentValue: 0,
	operator: null,
	previousValue: 0,
}

function calculator(state = initialState, action) {
	return state
}

const store = createStore(calculator)

const App = () =>
  <h1>Howard Instruments 2019</h1>

function mapStateToProps(state) {
	return state
}

const ConnectedApp = connect(mapStateToProps)(App)

ReactDOM.render(<Provider store={store}><ConnectedApp /></Provider>, document.getElementById("root"));