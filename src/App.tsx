import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { useAppDispatch } from './store/hooks'
import { fetchItems } from './store/lootsSlice'

import ItemList from './pages/ItemList/ItemList'
import EditItem from './pages/EditItem/EditItem'
import NotFound from './pages/NotFound/NotFound'

import logo from './assets/logo.svg'
import footerLogo from './assets/footer-logo.svg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    header: {
      backgroundColor: '#ececec',
      borderBottom: '1px solid lightgrey',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'calc(10px + 1vh)',
      '& a': {
        display: 'flex',
        alignItems: 'center',
        fontSize: 'calc(10px + 2vh)',
        textDecoration: 'none',
        textTransform: 'uppercase',
        '& img': {
          height: '3vh',
          marginRight: '20px',
          pointerEvents: 'none'
        },
        '& span': {
          color: '#001F36',
          fontWeight: 'bold'
        }
      }
    },
    main: {
      flex: 1,
      padding: '0 1.5vw',
      textAlign: 'center'
    },
    footer: {
      backgroundColor: '#001F36',
      '& a': {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        '& img': {
          width: '100px'
        }
      }
    }
  })
)

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchItems({}))
  }, [dispatch])

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Router>
        <header className={classes.header}>
          <Link to="/">
            <img src={logo} alt="logo" />
            <span>Loots list</span>
          </Link>
        </header>
        <main className={classes.main}>
          <Switch>
            <Route exact path="/" component={ItemList} />
            <Route exact path="/loot/:id" children={<EditItem />} />
            <Route exact path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </main>
        <footer className={classes.footer}>
          <a href="https://streamloots.com" title="Streamloots">
            <img src={footerLogo} alt="Streamloots" />&copy;
          </a>
        </footer>
      </Router>
    </div>
  )
}

export default App
