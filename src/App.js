import React, { Component } from 'react';
import logo from './logo.svg';
import FirstComponent from './components/learning-examples/FirstComponent'
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          My Todo Content
            <FirstComponent />
        </div>
    );
  }
}

export default App;
