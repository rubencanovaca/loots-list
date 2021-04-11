import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '2em'
    }
  })
)

function NotFound() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h3>Page not found</h3>
    </div>
  )
}

export default NotFound