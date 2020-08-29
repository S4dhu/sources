import React from 'react'
import { MainPage } from '../pages'
import { Store } from '../store'

import '../style/style.scss'

const appStore = new Store();

function App() {
    return (
        <>
            <MainPage store={appStore} />
        </>
    )
}

export default App