import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Root from './components/screens/root'
import Earth from './components/screens/earth'
import Mars from './components/screens/mars'
import Daily from './components/screens/daily'

import 'semantic-ui-css/semantic.min.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={Root}/>
                <Route exact path='/earth' component={Earth}/>
                <Route exact path='/mars' component={Mars}/>
                <Route exact path='/daily' component={Daily}/>
            </BrowserRouter>
        );
    }
}

export default App;
