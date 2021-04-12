import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '1em auto',
      width: 250,
      height: 380
    }
  })
)

const SkeletonListItem = () => {
  const classes = useStyles()
  return (
    <div className={classes.root} data-test="skeleton-list-item">
      <Skeleton variant="rect" width={250} height={380} animation="wave" />
    </div>
  )
}

export default SkeletonListItem