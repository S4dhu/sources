import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { Store } from './store'

const appStore = new Store();

ReactDOM.render(<App store={appStore} />, document.getElementById('root'))

if(module.hot)  module.hot.accept()