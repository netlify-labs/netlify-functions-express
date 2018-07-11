import React, { Component } from 'react'
import netlifyLogo from './netlify-logo.svg'
import expressLogo from './express.png'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo-wrapper">
            <img src={netlifyLogo} className="netlify-logo" alt="logo" />
            <span className='and'>+</span>
            <img src={expressLogo} className="express-logo" alt="logo" />

          </div>
          <h1 className="App-title">How to use express.js with Netlify functions</h1>
        </header>

        <p className="App-intro">
          <h2>Choose an example</h2>
        </p>

        <div className='content'>
          <a className='link' href="/.netlify/functions/aws-serverless-express">
            Example using `aws-serverless-express`
          </a>
          <a className='link' href="/.netlify/functions/serverless-http">
            Example using `serverless-http`
          </a>
        </div>
      </div>
    )
  }
}

export default App
