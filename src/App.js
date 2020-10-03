import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Root from './components/screens/root'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={Root}/>
            </BrowserRouter>
        );
    }
}

export default App;
