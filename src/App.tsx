import React from 'react'
import logo from './assets/logo.png'
import './App.scss'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <a className="app-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Loots</a>
      </header>
    </div>
  )
}

export default App
