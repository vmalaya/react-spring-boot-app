import React, {Component} from 'react';
import FirstComponent from './components/learning-examples/FirstComponent'
import TodoApp from "./components/todo/TodoApp";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            {/*<Counter/>*/}
            <TodoApp/>
        </div>
    );
  }
}

class LearningComponents extends Component {
  render() {
      return (
          <div className="LearningComponents">
              My Todo Content
              <FirstComponent />
          </div>
      );
  }
}
export default App;
