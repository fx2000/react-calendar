import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

// Components
import Titlebar from './components/Titlebar/Titlebar';

class App extends Component {
  render () {
    return (
      <>
        <Titlebar />
      </>
    );
  }
}

export default App;
