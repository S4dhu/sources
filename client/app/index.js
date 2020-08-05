import React from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MainPage } from '../pages'

function App() {
    return (
        <MainPage />
        // <Router>
        //     <NavBar />
        //     <Switch>
        //         <Route path="/sources/list" exact component={SourcesList} />
        //         <Route path="/sources/create" exact component={SourcesInsert} />
        //         <Route
        //             path="/sources/update/:id"
        //             exact
        //             component={SourcesUpdate}
        //         />
        //     </Switch>
        // </Router>
    )
}

export default App