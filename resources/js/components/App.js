import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewNote from './NewNote'
import Notes from './Notes'
import SingleNote from './SingleNote'
import EditNote from './EditNote'

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Notes} />
                        <Route path='/create' component={NewNote} />
                        <Route path='/:id' component={EditNote} />
                        {/*<Route path='/:id' component={SingleNote} />*/}
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))