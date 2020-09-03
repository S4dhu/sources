import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/app'
import { Store } from './src/store'

const appStore = new Store();

ReactDOM.render(<App store={appStore} />, document.getElementById('root'))

if(module.hot)  module.hot.accept()