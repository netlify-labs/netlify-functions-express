import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Express Demo</h1>
        </header>
        <p className="App-intro">
          This is using express!
        </p>

        <div>
          <a href="/.netlify/functions/aws-serverless-express">Example using `aws-serverless-express`</a>
        </div>
        <div>
          <a href="/.netlify/functions/serverless-http">Example using `serverless-http`</a>
        </div>
      </div>
    )
  }
}

export default App
