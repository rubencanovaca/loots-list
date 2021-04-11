import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { useAppSelector } from '../../store/hooks'
import { selectStatus, selectAllItems } from '../../store/lootsSlice'

import SkeletonList from '../../components/SkeletonList/SkeletonList'
import LootsList from '../../components/LootsList/LootsList'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '2em'
    }
  })
)

function ItemList() {
  const loading = useAppSelector(selectStatus) === 'loading'
  const loots = useAppSelector(selectAllItems)

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <LootsList loots={loots} />
      {loading && <SkeletonList />}
    </div>
  )
}

export default ItemList