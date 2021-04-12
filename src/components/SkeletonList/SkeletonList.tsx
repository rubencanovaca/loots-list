import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import SkeletonListItem from '../SkeletonListItem/SkeletonListItem'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden'
    }
  })
)

const SkeletonList = () => {
  const cardsPerRow = Math.floor(window.innerWidth / 260)

  const classes = useStyles()
  return (
    <div className={classes.root} data-test="skeleton-list">
      {[...Array(cardsPerRow * 2)].map((e, i) => (
        <SkeletonListItem key={i} />
      ))}
    </div>
  )
}

export default SkeletonList