import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../redux/redux-store';
import { MainPage } from '../pages'

import '../style/style.scss'

function App() {
    return (
        <Provider store={store}>
            <MainPage />
        </Provider>
    )
}

export default App