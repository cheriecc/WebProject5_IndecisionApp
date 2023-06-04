import React from 'react'
import ReactDOM from 'react-dom/client'
import IndecisionApp from './components/IndecisionApp'
import 'normalize.css/normalize.css'  // make our app compatible with different browsers
import './styles/styles.scss'

var appRoot = document.getElementById('app')
var root = ReactDOM.createRoot(appRoot)

root.render(<IndecisionApp />)