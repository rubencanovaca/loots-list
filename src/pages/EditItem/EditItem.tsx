import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

type Props = { id: string }

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '2em'
    }
  })
)

function EditItem({id}: Props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {id}
    </div>
  )
}

export default EditItem