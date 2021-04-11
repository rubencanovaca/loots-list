import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link, useParams } from 'react-router-dom'

import ItemList from './pages/ItemList/ItemList'
import EditItem from './pages/EditItem/EditItem'
import NotFound from './pages/NotFound/NotFound'

import logo from './assets/logo.svg'
import footerLogo from './assets/footer-logo.svg'
import './App.scss'

function App() {
  return (
    <div className="app">
      <Router>
        <header className="app-header">
          <Link to="/">
            <img src={logo} className="app-logo" alt="logo" />
            <span className="app-title">Loots list</span>
          </Link>
        </header>
        <main className="app-main">
          <Switch>
            <Route exact path="/" component={ItemList} />
            <Route exact path="/:id" children={<EditItem id={useParams.id} />} />
            <Route exact path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </main>
        <footer className="app-footer">
          <a href="https://streamloots.com" title="Streamloots">
            <img src={footerLogo} className="app-footer-logo" alt="Streamloots" />&copy;
          </a>
        </footer>
      </Router>
    </div>
  )
}

export default App
