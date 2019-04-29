import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Editor from './routes/editor/Editor';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              <span>Edit </span>
              <code>src/App.tsx</code> 
              <span>and save to reload.</span>
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
            <span>Learn React</span>
            </a>
          </header> */}
          <Route path="/" exact component={Editor} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
